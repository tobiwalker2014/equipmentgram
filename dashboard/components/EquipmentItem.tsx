import { Button } from "@mantine/core";

type Props = {
  onClick: () => void;
  item: any;
};

const EquipmentItem = ({ onClick, item }: Props) => {
  return (
    <Button size="xl" className="flex max-w-full  min-w-[300px] text-lg" onClick={onClick}>
      {/* <item.icon color={theme.colors[item.color][6]} size="2rem" /> */}
      {item.title}
    </Button>
  );
};

export default EquipmentItem;
