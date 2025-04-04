/**
 * @ Author: All Jobs PH
 * @ Create Time: 2025-04-04 20:17:33
 * @ Modified time: 2025-04-04 20:24:22
 * @ Description:
 *
 * Renders a component based on its order in an array.
 */

export function RenderSwitch({
  selection,
  selected,
}: {
  selection: any[];
  selected: number;
}) {
  // Make sure to check if selected is valid
  if (selected < 0 || selected >= selection.length) return <></>;
  else return <div>{selection[selected]}</div>;
}
