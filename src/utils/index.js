export const formatDate = (date) => {
  // Get the month, day, and year
  const month = date.toLocaleString("en-US", { month: "short" });
  const day = date.getDate();
  const year = date.getFullYear();

  const formattedDate = `${day}-${month}-${year}`;

  return formattedDate;
};

export function dateFormatter(dateString) {
  const inputDate = new Date(dateString);

  if (isNaN(inputDate)) {
    return "Invalid Date";
  }

  const year = inputDate.getFullYear();
  const month = String(inputDate.getMonth() + 1).padStart(2, "0");
  const day = String(inputDate.getDate()).padStart(2, "0");

  const formattedDate = `${year}-${month}-${day}`;
  return formattedDate;
}

export function getInitials(fullName) {
  const names = fullName.split(" ") 

  const initials = names.slice(0, 2).map((name) => name[0].toUpperCase());

  const initialsStr = initials.join("");

  return initialsStr;
}

export const PRIOTITYSTYLES = {
  high: "text-red-600",
  medium: "text-yellow-600",
  low: "text-blue-600",
};

export const TASK_TYPE = {
  todo: "bg-blue-600",
  "in progress": "bg-yellow-600",
  completed: "bg-green-600",
};

export const BGS = [
  "bg-blue-600",
  "bg-yellow-600",
  "bg-red-600",
  "bg-green-600",
];


export const getRoleClass = (role) => {
  switch (role) {
    case 'admin':
      return 'text-white bg-red-400 border-red-600  rounded-xl px-2 py-1';
    case 'artist':
      return 'text-white bg-yellow-400 border-yellow-600  rounded-xl px-2 py-1';
    case 'art_lover':
      return 'text-white bg-indigo-400 border-indigo-600  rounded-xl px-2 py-1';
    default:
      return 'text-white bg-gray-400 border-gray-600  rounded px-2 py-1';
  }
};