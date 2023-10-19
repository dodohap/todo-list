import { App } from "./app";
import { ToDoRoute } from "./routes/todo.route";
import { AuthRout } from "./routes/auth.route";

const app = new App([new ToDoRoute(), new AuthRout()]);

app.listen();
