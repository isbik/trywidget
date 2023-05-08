export const getWidgetUrl = () => {
  const script = document.querySelector("#tw_bubble");
  const slug = script?.getAttribute("data-widget");

  if (!slug) return "";

  return (
    (script?.getAttribute("data-url") ||
      "https://trywiget.ru/api/public/widgets/") +
    slug +
    "/"
  );
};
