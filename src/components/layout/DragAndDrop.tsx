import React, { FC, useState } from "react";
import { Segment, Icon, Header, Button } from "semantic-ui-react";

type Props = {
  inputRef: React.MutableRefObject<any>;
  handleDrop: (e: React.DragEvent<HTMLDivElement>) => void;
};

const DragAndDrop: FC<Props> = ({ inputRef, handleDrop }) => {
  const [isDragOver, setIsDragOver] = useState(false);

  return (
    <div
      onDrop={(e) => {
        handleDrop(e);
        setIsDragOver(false);
      }}
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragOver(true);
      }}
      onDragLeave={(e) => {
        e.preventDefault();
        setIsDragOver(false);
      }}
      style={{ maxWidth: "700px", width: "100%", margin: "0 auto" }}>
      <Segment color={isDragOver ? "red" : undefined} placeholder size="huge">
        <Header icon>
          <Icon name="file image outline" />
          画像をドラッグ＆ドロップしてください。
        </Header>
        <p style={{ fontSize: "16px" }}>
          最大<span style={{ color: "red" }}>5枚</span>まで追加可能です
        </p>
        <div className="module-spacer--sm" />
        <Button primary type="button" onClick={() => inputRef.current?.click() as any}>
          画像を追加
        </Button>
      </Segment>
    </div>
  );
};

export default DragAndDrop;
