import { useState } from "react";
import { participants, Participant } from "./user-data";
// Testing animate-css-grid library for layouts-grid.css
// This doesn't seem to be reliable for grid-area changes.
// import { wrapGrid } from "animate-css-grid";

function ParticipantImage({ user }: { user: Participant }) {
  const initials = user.name
    .split(/[\s-]+/)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  const fallback = `data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 180"><rect width="320" height="180" fill="#582323"/><text x="160" y="112" text-anchor="middle" fill="#f5f5f5" font-family="Arial,sans-serif" font-size="72">${initials}</text></svg>`
  )}`;

  return (
    <img
      src={user.img}
      alt={user.name}
      onError={(event) => {
        if (!event.currentTarget.src.startsWith("data:")) {
          event.currentTarget.src = fallback;
        }
      }}
    />
  );
}

export default function App() {
  const [pinnedUser, setPinnedUser] = useState<Participant | null>(null);
  const [stagedUsers, setStagedUsers] = useState<Participant[]>(() =>
    participants.slice(0, 3)
  );

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
              <ParticipantImage user={user} />
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
              {isStaged(user) ? <div /> : <ParticipantImage user={user} />}
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
