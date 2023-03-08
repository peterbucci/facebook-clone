import DropdownMenu from "components/DropdownMenu";
import { useLayoutEffect, useState } from "react";
import "./styles/select_dropdown.css";

function SelectDropdown({
  label,
  defaultSelection,
  listOrder,
  onSelect,
  textInputButton,
}) {
  const [listItems, setListItems] = useState({});
  const [selected, setSelected] = useState(
    defaultSelection ? defaultSelection : listOrder[0]
  );

  useLayoutEffect(() => {
    const items = listOrder.reduce(
      (items, item) => ({
        [item]: {
          onClick: () => {
            setSelected(item);
            if (onSelect) onSelect(item);
          },
        },
        ...items,
      }),
      {}
    );
    setListItems(items);
  }, [listOrder, onSelect]);

  return (
    <DropdownMenu
      listItems={listItems}
      listOrder={listOrder}
      label={label}
      buttonIcon="arrowDown"
      buttonIconRight={true}
      buttonText={selected}
      width={344}
      right={0.02}
      align="left"
      inputButton={textInputButton}
    />
  );
}

export default SelectDropdown;
