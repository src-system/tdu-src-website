type ProfileItemProps = {
  label: string;
  value: string;
};

export const ProfileItem = ({ label, value }: ProfileItemProps) => {
  return (
    <div className="flex items-center gap-4 rounded-lg bg-gray-50 p-4">
      <span className="text-forest font-bold w-24">{label}</span>
      <span className="text-charcoal">{value}</span>
    </div>
  );
};

type ProfileGridProps = {
  items: { label: string; value: string }[];
};

export const ProfileGrid = ({ items }: ProfileGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {items.map((item) => (
        <ProfileItem key={item.label} label={item.label} value={item.value} />
      ))}
    </div>
  );
};
