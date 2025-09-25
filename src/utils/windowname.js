export function getLocationName({ pathname }) {
  // Check if pathname is undefined or null
  if (pathname === undefined || pathname === null) {
    // Handle the case when pathname is undefined or null
    return "unknown";
  }

  // Remove leading slash if present
  if (pathname.startsWith("/")) {
    pathname = pathname.substring(1);
  }

  // Split the pathname by slashes
  const parts = pathname.split("/");
  
  // Remove empty parts and join with '>'
  const name01 = parts.filter((part) => part !== "").join(" > ");
  
  // Split the name by underscore
  const underscore = name01.split("_");
  
  // Remove empty parts and join with '>'
  const name = underscore.filter((part) => part !== "").join(" ");

  // Handle the case when the location is '/'
  if (name === "") {
    return "dashboard";
  }

  return name;
}
