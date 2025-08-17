import { useEffect } from 'react';

interface PerformanceMetrics {
  lcp?: number;
  fid?: number;
  cls?: number;
  fcp?: number;
  ttfb?: number;
}

export const usePerformanceMonitor = () => {
  useEffect(() => {
    // Only run in production and if performance API is available
    if (process.env.NODE_ENV !== 'production' || !window.performance) {
      return;
    }

    const metrics: PerformanceMetrics = {};

    // Largest Contentful Paint (LCP)
    const observeLCP = () => {
      if ('PerformanceObserver' in window) {
        const observer = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1];
          metrics.lcp = lastEntry.startTime;
          
          // Report to analytics (replace with your analytics service)
          console.log('LCP:', metrics.lcp);
        });
        
        observer.observe({ entryTypes: ['largest-contentful-paint'] });
      }
    };

    // First Input Delay (FID)
    const observeFID = () => {
      if ('PerformanceObserver' in window) {
        const observer = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          entries.forEach((entry: any) => {
            // processingStart exists on PerformanceEventTiming; fallback if unavailable
            const processingStart = entry.processingStart ?? entry.startTime;
            metrics.fid = processingStart - entry.startTime;
            console.log('FID:', metrics.fid);
          });
        });
        
        observer.observe({ entryTypes: ['first-input'] });
      }
    };

    // Cumulative Layout Shift (CLS)
    const observeCLS = () => {
      if ('PerformanceObserver' in window) {
        let clsValue = 0;
        const observer = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          entries.forEach((entry: any) => {
            if (!entry.hadRecentInput) {
              clsValue += entry.value;
            }
          });
          metrics.cls = clsValue;
          console.log('CLS:', metrics.cls);
        });
        
        observer.observe({ entryTypes: ['layout-shift'] });
      }
    };

    // First Contentful Paint (FCP)
    const observeFCP = () => {
      if ('PerformanceObserver' in window) {
        const observer = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          entries.forEach((entry) => {
            if (entry.name === 'first-contentful-paint') {
              metrics.fcp = entry.startTime;
              console.log('FCP:', metrics.fcp);
            }
          });
        });
        
        observer.observe({ entryTypes: ['paint'] });
      }
    };

    // Time to First Byte (TTFB)
    const measureTTFB = () => {
      const navigationEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      if (navigationEntry) {
        metrics.ttfb = navigationEntry.responseStart - navigationEntry.requestStart;
        console.log('TTFB:', metrics.ttfb);
      }
    };

    // Resource loading performance
    const monitorResources = () => {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          // Log slow resources (>1s)
          if (entry.duration > 1000) {
            console.warn('Slow resource:', entry.name, entry.duration + 'ms');
          }
        });
      });
      
      observer.observe({ entryTypes: ['resource'] });
    };

    // Long tasks monitoring
    const monitorLongTasks = () => {
      if ('PerformanceObserver' in window) {
        const observer = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          entries.forEach((entry) => {
            console.warn('Long task detected:', entry.duration + 'ms');
          });
        });
        
        observer.observe({ entryTypes: ['longtask'] });
      }
    };

    // Initialize all observers
    observeLCP();
    observeFID();
    observeCLS();
    observeFCP();
    measureTTFB();
    monitorResources();
    monitorLongTasks();

    // Report metrics after page load
    window.addEventListener('load', () => {
      setTimeout(() => {
        // Send metrics to your analytics service
        console.log('Performance Metrics:', metrics);
      }, 0);
    });

  }, []);
};

export default usePerformanceMonitor;