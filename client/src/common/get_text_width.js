function getTextWidth(el, font) {
  if (!el) return null;
  var text = Array.isArray(el)
    ? el.reduce(function (a, b) {
        return a.length > b.length ? a : b;
      })
    : el;
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");

  context.font = font || getComputedStyle(document.body).font;

  return context.measureText(text).width + 32;
}

export default getTextWidth;
