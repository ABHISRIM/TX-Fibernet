import { useLayoutEffect } from 'react';

let lockCount = 0;
let originalDocumentStyles = null;

const saveStyle = (element, property) => ({
  property,
  value: element.style.getPropertyValue(property),
  priority: element.style.getPropertyPriority(property)
});

const restoreStyles = (element, styles) => {
  styles.forEach(({ property, value, priority }) => {
    if (value) {
      element.style.setProperty(property, value, priority);
    } else {
      element.style.removeProperty(property);
    }
  });
};

const acquireScrollLock = () => {
  if (lockCount === 0) {
    const { body, documentElement } = document;
    const scrollX = window.scrollX;
    const scrollY = window.scrollY;
    const scrollbarWidth = window.innerWidth - documentElement.clientWidth;
    const bodyPaddingRight = Number.parseFloat(window.getComputedStyle(body).paddingRight) || 0;

    originalDocumentStyles = {
      body: [
        saveStyle(body, 'position'),
        saveStyle(body, 'top'),
        saveStyle(body, 'left'),
        saveStyle(body, 'width'),
        saveStyle(body, 'overflow'),
        saveStyle(body, 'padding-right')
      ],
      documentElement: [saveStyle(documentElement, 'overflow')],
      scrollX,
      scrollY
    };

    documentElement.style.setProperty('overflow', 'hidden');
    body.style.setProperty('position', 'fixed');
    body.style.setProperty('top', `${-scrollY}px`);
    body.style.setProperty('left', `${-scrollX}px`);
    body.style.setProperty('width', '100%');
    body.style.setProperty('overflow', 'hidden');

    if (scrollbarWidth > 0) {
      body.style.setProperty('padding-right', `${bodyPaddingRight + scrollbarWidth}px`);
    }
  }

  lockCount += 1;
};

const releaseScrollLock = () => {
  lockCount -= 1;

  if (lockCount === 0 && originalDocumentStyles) {
    const { body, documentElement } = document;
    const { body: bodyStyles, documentElement: documentStyles, scrollX, scrollY } = originalDocumentStyles;

    restoreStyles(body, bodyStyles);
    restoreStyles(documentElement, documentStyles);
    originalDocumentStyles = null;
    window.scrollTo(scrollX, scrollY);
  }
};

const useBodyScrollLock = (isLocked) => {
  useLayoutEffect(() => {
    if (!isLocked) return undefined;

    acquireScrollLock();
    return releaseScrollLock;
  }, [isLocked]);
};

export default useBodyScrollLock;
