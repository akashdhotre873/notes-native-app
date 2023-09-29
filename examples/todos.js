import { taskStatus, todoStatus } from "../helpers/constants";

const todos = [
  {
    name: "Note name",
    tasks: [
      {
        id: "1232-fdsa2-fsd-23",
        value: "task value",
        status: taskStatus.COMPLETED,
      },
    ],
    passwordProtected: true,
    passwordHash: "3f3fsasfd3fjds",
    salt: "2131-fdsaf-fsadf-fsda",
    status: todoStatus.COMPLETED,
    dateUpdated: "2023-09-20T00:00:0000",
  },
];
