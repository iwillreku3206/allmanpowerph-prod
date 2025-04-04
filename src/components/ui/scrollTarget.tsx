export type ScrollTarget = {
  goto: () => void;
};

// Lifted from here
// https://stackoverflow.com/questions/18071046/smooth-scroll-to-specific-div-on-click
export function useScrollTarget(
  target: HTMLElement | null = null
): ScrollTarget {
  let scrollContainer: HTMLElement | null = target;

  // Find scrollable
  do {
    scrollContainer = scrollContainer?.parentNode as HTMLElement;

    // No scrollable component above
    if (!scrollContainer) break;

    // Check if scrollable (does not reset to 0)
    scrollContainer.scrollTop += 1;
  } while (scrollContainer?.scrollTop === 0);

  // Scroller API
  const scrollTarget: ScrollTarget = {
    goto: () => {
      if (!scrollContainer) return;

      // Compute target y value
      let targetY = 0;
      let trace: HTMLElement | null = target;

      // Trace
      do {
        if (trace === scrollContainer) break;
        targetY += trace?.offsetTop ?? 0;
        trace = trace?.offsetParent as HTMLElement;
      } while (true);

      // I modified this part let's fucking go
      const scroll = function (
        c: HTMLElement,
        a: number,
        b: number,
        i: number
      ) {
        i++;
        if (i > 30) return;
        a += (b - a) / 4;
        c.scrollTop = a;
        requestAnimationFrame(() => scroll(c, a, b, i));
      };

      // start scrolling
      scroll(scrollContainer, scrollContainer.scrollTop, targetY, 0);
    },
  };

  return scrollTarget;
}
