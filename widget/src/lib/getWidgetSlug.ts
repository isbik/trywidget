export const getWidgetUrl = () => {
  const script = document.querySelector("[data-widget]");

  const slug = script?.getAttribute("data-widget");

  if (!slug) return "";

  return (
    (script?.getAttribute("data-url") ||
      "https://trywiget.ru/api/public/widgets/") +
    slug +
    "/"
  );
};
