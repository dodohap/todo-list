import { TodoType } from "../../../../types/TodoType";
import { updateTodoApi, deleteTodoApi } from "../../../../services/api/todoApi";
import { TODO_STATUS, statusMap } from "../../../../utils/todoStatusUtil";

export default function Todo({
  todo,
  updateTodoList,
  removeTodo,
}: {
  todo: TodoType;
  updateTodoList: any;
  removeTodo: any;
}) {
  const { statusColor, statusButtonText, nextStatus } = statusMap[todo.status];

  const updateTodoStatus = async () => {
    if (todo.status === TODO_STATUS.DONE) {
      const deleteRes = await deleteTodoApi(todo.id);
      if (deleteRes.status === "succes") {
        removeTodo(deleteRes.res.data);
      }

      return;
    }

    if (!nextStatus) return;

    const res = await updateTodoApi({
      status: nextStatus,
      createdAt: todo.createdAt,
      description: todo.description,
      id: todo.id,
      userId: todo.userId,
    });

    if (res.status === "error") {
      console.log(res.message);
      return;
    }

    updateTodoList(res.res.data);
  };

  return (
    <div className="todo-card-body">
      <div className="todo-card-description">
        <div className="todo-card-description-element">
          <div>
            <p className="todo-status" style={{ color: statusColor }}>
              {todo.status}
            </p>
            <div className="todo-description">{todo.description}</div>
            <p className="todo-createdAt">{todo.createdAt}</p>
          </div>

          <div className="todo-card-buttons">
            <button
              className="todo-btn--set-status"
              onClick={() => updateTodoStatus()}
            >
              {statusButtonText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
