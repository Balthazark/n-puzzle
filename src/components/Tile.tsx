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
  font-weight: bold;
  font-size: clamp(0.5rem, 1vw + 0.5rem, 2rem);
`;

const Tile = ({ value, isEmpty, onClick }: TileProps) => {
  return (
    <StyledTile onClick={onClick} disabled={isEmpty} isEmpty={isEmpty}>
      {!isEmpty ? value : ""}
    </StyledTile>
  );
};

export default Tile;
