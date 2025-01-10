import fs from "fs";
import path from "path";

const filePath = path.join(
  new URL(".", import.meta.url).pathname,
  "database.json"
);

export function readJSONFile() {
  try {
    const data = fs.readFileSync("./database.json", "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading JSON file:", error);
    return null;
  }
}

export function writeJSONFile(jsonData) {
  try {
    const jsonString = JSON.stringify(jsonData, null, 2);
    fs.writeFileSync("./database.json", jsonString, "utf8");
    console.log("File written successfully.");
  } catch (error) {
    console.error("Error writing JSON file:", error);
  }
}

export function addNewItem(newItem) {
  const jsonData = readJSONFile();
  if (jsonData && jsonData.pencils) {
    jsonData.pencils.push(newItem);
    writeJSONFile(jsonData);
    console.log("New item added:", newItem);
  } else {
    console.error("Invalid JSON structure.");
  }
}

export function updateItem(index, updatedItem) {
  const jsonData = readJSONFile();
  if (jsonData && jsonData.pencils && jsonData.pencils[index]) {
    jsonData.pencils[index] = updatedItem;
    writeJSONFile(jsonData);
    console.log(`Item at index ${index} updated to:`, updatedItem);
  } else {
    console.error("Invalid index or JSON structure.");
  }
}

export function deleteItem(index) {
  const jsonData = readJSONFile();
  if (jsonData && jsonData.pencils && jsonData.pencils[index]) {
    const deletedItem = jsonData.pencils.splice(index, 1);
    writeJSONFile(jsonData);
    console.log(`Item at index ${index} deleted:`, deletedItem);
  } else {
    console.error("Invalid index or JSON structure.");
  }
}
