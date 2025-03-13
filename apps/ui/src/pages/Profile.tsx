import { useStore } from "../store";

export const Profile = () => {
  const user = useStore((state) => state.user);

  return (
    <div className="p-4 bg-gray-100 rounded-md">
      <h2 className="text-xl font-bold">Perfil</h2>
      {user ? (
        <div>
          <p>
            <strong>Nombre:</strong> {user.name}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
        </div>
      ) : (
        <p>No hay usuario autenticado.</p>
      )}
    </div>
  );
};
