import { TodoType } from "../../../../typesAndEnums";
import { statusMap } from "../../../../utils/todoStatusUtil";

export default function Todo({
  todo,
  updateTodoList,
}: {
  todo: TodoType;
  updateTodoList: (todo: TodoType) => void;
}) {
  const { statusColor, statusButtonText } = statusMap[todo.status];

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
              onClick={() => updateTodoList(todo)}
            >
              {statusButtonText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
