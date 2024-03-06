import React from "react";
import styled from "styled-components";

type TileProps = {
  value: number;
  isEmpty: boolean;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
};

const StyledTile = styled.button``;

const Tile = ({ value, isEmpty, onClick }: TileProps) => {
  return (
    <StyledTile onClick={onClick} disabled={isEmpty}>
      {!isEmpty ? value : ""}
    </StyledTile>
  );
};

export default Tile;
