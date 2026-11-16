/* ============================================================
   Peak Media Virtual Scroller Engine (js/virtual-scroll.js)
   High-performance zero-dependency DOM windowing for Cinema & Music Catalogs.
   Provides smooth 60/120 FPS infinite scrolling with generous directional buffer.
   ============================================================ */
(function (window) {
  'use strict';

  class PeakVirtualGrid {
    constructor(options) {
      this.id = options.id;
      this.containerSelector = options.container;
      this.container = typeof options.container === 'string' ? document.querySelector(options.container) : options.container;
      this.items = options.items || [];
      this.renderItem = options.renderItem;
      this.pageSize = options.pageSize || 24;
      this.bufferPx = options.bufferPx || 1400; // Balanced sweet spot: ~1.5 viewports of vertical buffer
      this.estimatedRowHeight = options.estimatedRowHeight || 340;
      this.bufferRows = options.bufferRows || Math.max(5, Math.ceil(this.bufferPx / this.estimatedRowHeight));
      this.rowHeight = this.estimatedRowHeight;
      this.rowGap = 16;
      this.getCols = options.getCols || this.defaultCols.bind(this);
      this.paginationId = options.paginationId;
      this.emptyHTML = options.emptyHTML || '<div class="py-12 text-center text-gray-400">No items found</div>';
      this.onRangeChange = options.onRangeChange || null;

      this.currentFirstRow = -1;
      this.currentLastRow = -1;
      this.currentCols = -1;
      this.lastScrollY = window.scrollY || 0;
      this.scrollDirection = 1; // 1 = down, -1 = up
      this.rafId = 0;

      this.onScroll = this.onScroll.bind(this);
      this.onResize = this.onResize.bind(this);

      this.init();
    }

    defaultCols() {
      if (!this.container) return 1;
      if (this.container.id === 'musicTracksContainer') {
        return window.innerWidth >= 768 ? 2 : 1;
      }
      const w = window.innerWidth;
      if (w < 640) return 2;
      if (w < 768) return 3;
      if (w < 1024) return 4;
      if (w < 1280) return 5;
      return 6;
    }

    init() {
      if (!this.container) return;
      this.container.style.overflowAnchor = 'none';
      this.measureGap();
      window.addEventListener('scroll', this.onScroll, { passive: true });
      window.addEventListener('resize', this.onResize, { passive: true });
      this.render(true);
    }

    measureGap() {
      if (!this.container) return;
      try {
        const cs = window.getComputedStyle(this.container);
        const g = parseFloat(cs.rowGap || cs.gap);
        if (!isNaN(g) && g >= 0) this.rowGap = g;
      } catch (_) {}
    }

    setItems(items, resetScroll = false) {
      this.items = items || [];
      this.currentFirstRow = -1;
      this.currentLastRow = -1;
      this.currentCols = -1;
      if (!this.container || !this.container.isConnected) {
        this.container = typeof this.containerSelector === 'string' ? document.querySelector(this.containerSelector) : this.container;
      }
      if (resetScroll && this.container && this.container.offsetParent !== null) {
        const rect = this.container.getBoundingClientRect();
        if (rect.top < 0) {
          const docTop = rect.top + window.scrollY;
          window.scrollTo({ top: Math.max(0, docTop - 80), behavior: 'auto' });
        }
      }
      this.render(true);
    }

    onScroll() {
      const currentScrollY = window.scrollY || 0;
      const delta = currentScrollY - this.lastScrollY;
      if (Math.abs(delta) > 15) {
        this.scrollDirection = delta > 0 ? 1 : -1;
      }
      this.lastScrollY = currentScrollY;

      if (this.rafId) return;
      this.rafId = requestAnimationFrame(() => {
        this.rafId = 0;
        this.render(false);
      });
    }

    onResize() {
      this.currentCols = -1;
      this.measureGap();
      this.render(true);
    }

    render(force = false) {
      if (!this.container || !this.container.isConnected) {
        this.container = typeof this.containerSelector === 'string' ? document.querySelector(this.containerSelector) : this.container;
      }
      if (!this.container || this.container.offsetParent === null) return;

      if (!this.items.length) {
        this.container.innerHTML = this.emptyHTML;
        this.renderPaginationUI(1, 1);
        return;
      }

      this.measureGap();
      const cols = this.getCols();
      const totalRows = Math.ceil(this.items.length / cols);
      const rect = this.container.getBoundingClientRect();
      const headerOffset = 68;
      const scrolledPast = Math.max(0, -rect.top + headerOffset);
      const viewportHeight = window.innerHeight;

      // Base buffer rows computed from pixel budget (sweet spot: 5 rows for cinema, 14 for music)
      const baseBufferRows = Math.max(this.bufferRows, Math.ceil(this.bufferPx / this.rowHeight));

      // Asymmetric directional runway: subtle +1 to 2 extra forward rows in active scroll direction
      const forwardBoost = Math.min(2, Math.round(baseBufferRows * 0.15));
      const topBuffer = this.scrollDirection === -1 ? baseBufferRows + forwardBoost : baseBufferRows;
      const bottomBuffer = this.scrollDirection === 1 ? baseBufferRows + forwardBoost : baseBufferRows;

      let firstRow = Math.floor(scrolledPast / this.rowHeight) - topBuffer;
      if (firstRow < 0) firstRow = 0;

      let lastRow = Math.ceil((scrolledPast + viewportHeight) / this.rowHeight) + bottomBuffer;
      if (lastRow >= totalRows) lastRow = totalRows - 1;

      if (!force && firstRow === this.currentFirstRow && lastRow === this.currentLastRow && cols === this.currentCols) {
        return;
      }

      this.currentFirstRow = firstRow;
      this.currentLastRow = lastRow;
      this.currentCols = cols;

      const startIndex = firstRow * cols;
      const endIndex = Math.min(this.items.length, (lastRow + 1) * cols);
      const slice = this.items.slice(startIndex, endIndex);

      const topHeight = Math.max(0, firstRow * this.rowHeight - (firstRow > 0 ? this.rowGap : 0));
      const remainingRows = totalRows - 1 - lastRow;
      const bottomHeight = Math.max(0, remainingRows * this.rowHeight - (remainingRows > 0 ? this.rowGap : 0));

      let html = '';
      if (topHeight > 0) {
        html += `<div class="pv-spacer-top col-span-full" style="grid-column: 1 / -1; height: ${topHeight}px; margin: 0; padding: 0; border: none; pointer-events: none;"></div>`;
      }
      html += slice.map((item, idx) => this.renderItem(item, startIndex + idx)).join('');
      if (bottomHeight > 0) {
        html += `<div class="pv-spacer-bottom col-span-full" style="grid-column: 1 / -1; height: ${bottomHeight}px; margin: 0; padding: 0; border: none; pointer-events: none;"></div>`;
      }

      this.container.innerHTML = html;

      // Calibrate row height from sample rendered card
      const sample = (this.container && typeof this.container.querySelector === 'function')
        ? this.container.querySelector('.card-hover, [data-type], .theme-card-bg, .group')
        : null;
      if (sample) {
        const h = sample.getBoundingClientRect().height;
        if (h > 40) {
          this.rowHeight = Math.round(h + this.rowGap);
        }
      }

      if (typeof window.attachThumbObservers === 'function') {
        window.attachThumbObservers(this.container);
      }

      // Sync pagination controls based on actual visible row on screen (not offscreen buffer top)
      const totalPages = Math.max(1, Math.ceil(this.items.length / this.pageSize));
      const visibleRow = Math.floor(scrolledPast / this.rowHeight);
      const visibleIndex = Math.min(this.items.length - 1, Math.max(0, visibleRow * cols));
      const curPage = Math.min(totalPages, Math.max(1, Math.floor(visibleIndex / this.pageSize) + 1));
      this.renderPaginationUI(curPage, totalPages);

      if (this.onRangeChange) {
        this.onRangeChange(startIndex, endIndex, this.items.length, curPage, totalPages);
      }
    }

    renderPaginationUI(curPage, totalPages) {
      if (!this.paginationId) return;
      const el = document.getElementById(this.paginationId);
      if (!el) return;

      if (totalPages <= 1) {
        el.innerHTML = '';
        return;
      }

      el.innerHTML = `
        <div class="flex flex-wrap items-center justify-center gap-2 sm:gap-3 py-3 w-full">
          <button type="button" ${curPage <= 1 ? 'disabled' : ''} onclick="window.PeakVirtualScroller.scrollToPage('${this.id}', ${curPage - 1})" class="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 disabled:opacity-30 border border-white/10 text-xs font-semibold text-gray-200 transition-all cursor-pointer">
            <i class="fa-solid fa-chevron-left mr-1"></i> Prev
          </button>
          <div class="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs text-gray-300 font-mono flex items-center gap-2">
            <span>Page <strong class="text-brand-gold">${curPage}</strong> of ${totalPages}</span>
            <span class="text-white/20">|</span>
            <span class="text-[11px] text-emerald-400 font-semibold flex items-center gap-1"><i class="fa-solid fa-bolt text-[10px]"></i>Virtual Stream</span>
          </div>
          <button type="button" ${curPage >= totalPages ? 'disabled' : ''} onclick="window.PeakVirtualScroller.scrollToPage('${this.id}', ${curPage + 1})" class="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 disabled:opacity-30 border border-white/10 text-xs font-semibold text-gray-200 transition-all cursor-pointer">
            Next <i class="fa-solid fa-chevron-right ml-1"></i>
          </button>
        </div>
      `;
    }

    scrollToPage(targetPage) {
      const cols = this.getCols();
      const totalPages = Math.max(1, Math.ceil(this.items.length / this.pageSize));
      const page = Math.max(1, Math.min(totalPages, targetPage));
      const targetIndex = (page - 1) * this.pageSize;
      const targetRow = Math.floor(targetIndex / cols);
      const targetOffset = targetRow * this.rowHeight;

      if (!this.container) return;
      const containerDocTop = this.container.getBoundingClientRect().top + window.scrollY;
      const targetScrollY = containerDocTop + targetOffset - 80;

      window.scrollTo({
        top: Math.max(0, targetScrollY),
        behavior: 'smooth'
      });
    }

    destroy() {
      window.removeEventListener('scroll', this.onScroll);
      window.removeEventListener('resize', this.onResize);
      if (this.rafId) cancelAnimationFrame(this.rafId);
    }
  }

  const registry = {};

  window.PeakVirtualScroller = {
    mount(id, options) {
      if (registry[id]) {
        registry[id].destroy();
      }
      options.id = id;
      const instance = new PeakVirtualGrid(options);
      registry[id] = instance;
      return instance;
    },

    get(id) {
      return registry[id] || null;
    },

    scrollToPage(id, page) {
      if (registry[id]) {
        registry[id].scrollToPage(page);
      }
    },

    update(id) {
      if (id && registry[id]) {
        registry[id].render(true);
      } else if (!id) {
        Object.values(registry).forEach(inst => inst.render(true));
      }
    },

    setItems(id, items, resetScroll = false) {
      if (registry[id]) {
        registry[id].setItems(items, resetScroll);
      }
    }
  };
})(window);
