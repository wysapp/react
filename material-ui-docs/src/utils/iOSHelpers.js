
export const getOffsetTop = (elem) => {
  let yPos = elem.offsetTop;
  let tempEl = elem.offsetParent;

  while(tempEl != null) {
    yPos += tempEl.offsetTop;
    tempEl = tempEl.offsetParent;
  }

  return yPos;
};

export const isIOS = () => /iPad|iPhone|iPod/.test(window.navigator.userAgent) && !window.MSStream;