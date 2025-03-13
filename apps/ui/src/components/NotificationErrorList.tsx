type NotificationErrorListProps = {
  errorList: string[];
};

export const NotificationErrorList = ({
  errorList,
}: NotificationErrorListProps) => {
  return (
    <ul style={{ paddingLeft: 10 }}>
      {errorList.map((error, i) => (
        <li key={i}>{String(error)}</li>
      ))}
    </ul>
  );
};
