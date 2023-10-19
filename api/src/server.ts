import { App } from './app';
import { ToDoRoute } from './routes/todo.route';
import { AuthRout } from './routes/auth.route';
import { UserRoute } from './routes/user.route';

const app = new App([new ToDoRoute(), new UserRoute(), new AuthRout()]);

app.listen();