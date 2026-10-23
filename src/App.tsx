import { useEffect, useRef, useState } from "react";
import { participants, Participant } from "./user-data";
// Testing animate-css-grid library for layouts-grid.css
// This doesn't seem to be reliable for grid-area changes.
// import { wrapGrid } from "animate-css-grid";

export default function App() {
  const [pinnedUser, setPinnedUser] = useState<Participant | null>(null);
  const [stagedUsers, setStagedUsers] = useState<Participant[]>([]);

  const isPinned = (user: Participant) => user === pinnedUser;
  const isStaged = (user: Participant) => stagedUsers.includes(user);
  const addToStage = (user: Participant) =>
    setStagedUsers([...stagedUsers, user]);
  const removeFromStage = (user: Participant) => {
    if (isPinned(user)) setPinnedUser(null);
    setStagedUsers(stagedUsers.filter((u) => u !== user));
  };

  // For Testing animate-css-grid library
  // const grid = useRef<HTMLUListElement>(null);
  //
  // useEffect(() => {
  //   if (grid.current) {
  //     wrapGrid(grid.current);
  //   }
  // }, [grid]);

  let unpinnedCount = 1;

  return (
    <div className="Main">
      <div className="Stage">
        <ul className="Presentables" data-pinned={pinnedUser !== null}>
          {stagedUsers.map((user: Participant) => (
            <li
              key={user.name}
              data-pinned={isPinned(user)}
              data-unpinned={isPinned(user) ? undefined : unpinnedCount++}
              className="PresentableItem"
            >
              <div className="PresentableItem-header">
                <div className="PresentableItem-actions">
                  <button type="button">
                    <span className="material-symbols-rounded">mic</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPinnedUser(isPinned(user) ? null : user)}
                  >
                    <span className="material-symbols-rounded">
                      {isPinned(user) ? "keep_off" : "keep"}
                    </span>
                  </button>
                  <button type="button" onClick={() => removeFromStage(user)}>
                    <span className="material-symbols-rounded">close</span>
                  </button>
                </div>
              </div>
              <img src={user.img} />
              <div className="PresentableItem-footer">
                <div className="PresentableItem-name">{user.name}</div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="Backstage">
        <ul>
          {participants.map((user: Participant) => (
            <li
              key={user.name}
              className="Participant"
              data-on-stage={isStaged(user)}
            >
              {isStaged(user) ? <div /> : <img src={user.img} />}
              <button
                type="button"
                onClick={() =>
                  isStaged(user) ? removeFromStage(user) : addToStage(user)
                }
              >
                {isStaged(user) ? "Remove from stage" : "Add to stage"}
              </button>
              <small>{user.name}</small>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
