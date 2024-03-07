import React from "react";
import styled from "styled-components";

type TileProps = {
  value: number;
  isEmpty: boolean;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
};

type StyledTileProps = Pick<TileProps, "isEmpty">;

const StyledTile = styled.button<StyledTileProps>`
  aspect-ratio: 1;
  font-size: 2vmin;
  border-radius: 0;
  box-shadow: none;
  border: 1px solid black;
`;

const Tile = ({ value, isEmpty, onClick }: TileProps) => {
  return (
    <StyledTile onClick={onClick} disabled={isEmpty} isEmpty={isEmpty}>
      {!isEmpty ? value : ""}
    </StyledTile>
  );
};

export default Tile;
