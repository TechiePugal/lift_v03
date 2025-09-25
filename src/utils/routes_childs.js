import routes from "../routes/index";

export function getAllChildren() {
    const allChildren = [];
    for (const route of routes) {
      if (route?.childrens) {
        allChildren.push(...route.childrens);
      }
    }
    return allChildren;
  }