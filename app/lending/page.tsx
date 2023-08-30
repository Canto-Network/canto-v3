"use client";

import Button from "@/components/button/button";
import Modal from "@/components/modal/modal";
import Text from "@/components/text";
import { useState } from "react";

export default function LendingPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div>
      <Modal
        open={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
        }}
        width="500px"
        height="80vh"
      >
        <Text font="proto_mono"> This is a text</Text>
      </Modal>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          placeItems: "center",
          width: "50%px",
          minHeight: "100%",
          backgroundColor: "var(--card-sub-surface-color",
        }}
      >
        {/* <Button
          color="primary"
          height={"small"}
          onClick={() => {
            setIsModalOpen(true);
          }}
        >
          Show Modal
        </Button> */}
        <Button color="secondary" height={"small"}>
          Sample Text
        </Button>
        <Button color="accent" height={"small"}>
          Sample Text
        </Button>
        <Button color="primary" height={"medium"}>
          Sample Text
        </Button>

        <Button color="secondary" height={"small"} disabled>
          Sample Text
        </Button>
        <Button color="accent" height={"small"} disabled>
          Sample Text
        </Button>
        <Button color="primary" height={"medium"} disabled>
          Sample Text
        </Button>
        <Button color="secondary" height={"medium"}>
          Sample Text
        </Button>
        <Button color="accent" height={"medium"}>
          Sample Text
        </Button>
        <Button color="primary" height={"large"}>
          Sample Text
        </Button>
        <Button color="secondary" height={"large"}>
          Sample Text
        </Button>
        <Button color="accent" height={"large"}>
          Sample Text
        </Button>
        <Button color="primary" height={"small"} fontFamily="proto_mono">
          Sample Text
        </Button>
        <Button color="secondary" height={"small"} fontFamily="proto_mono">
          Sample Text
        </Button>
        <Button color="accent" height={"small"} fontFamily="proto_mono">
          Sample Text
        </Button>
        <Button color="primary" height={"medium"} fontFamily="proto_mono">
          Sample Text
        </Button>
        <Button color="secondary" height={"medium"} fontFamily="proto_mono">
          Sample Text
        </Button>
        <Button color="accent" height={"medium"} fontFamily="proto_mono">
          Sample Text
        </Button>
        <Button color="primary" height={"large"} fontFamily="proto_mono">
          Sample Text
        </Button>
        <Button color="secondary" height={"large"} fontFamily="proto_mono">
          Sample Text
        </Button>
        <Button color="accent" height={"large"} fontFamily="proto_mono">
          Sample Text
        </Button>

        <Button
          color="primary"
          height={"medium"}
          fontFamily="proto_mono"
          padding={"sm"}
        >
          Sample Text
        </Button>
        <Button
          color="secondary"
          height={"medium"}
          padding={"md"}
          fontFamily="proto_mono"
        >
          Sample Text
        </Button>
        <Button
          color="accent"
          height={"medium"}
          padding={"lg"}
          fontFamily="proto_mono"
        >
          Sample Text
        </Button>

        <Button color="primary" isLoading fontFamily="proto_mono">
          Sample Text
        </Button>

        <Button color="secondary" isLoading fontFamily="proto_mono">
          Sample Text
        </Button>
        <Button color="accent" isLoading fontFamily="proto_mono">
          Sample Text
        </Button>
        {/* icon - left */}
        <Button
          color="primary"
          icon={{
            url: "/tokens/note.svg",
            position: "left",
          }}
          fontFamily="proto_mono"
        >
          Sample Text
        </Button>

        <Button
          color="secondary"
          icon={{
            url: "/tokens/note.svg",
            position: "left",
          }}
          fontFamily="proto_mono"
        >
          Sample Text
        </Button>
        <Button
          color="accent"
          icon={{
            url: "/tokens/note.svg",
            position: "left",
          }}
          fontFamily="proto_mono"
        >
          Sample Text
        </Button>

        {/* icon - right */}
        <Button
          color="primary"
          icon={{
            url: "/tokens/canto.svg",
            position: "right",
          }}
          fontFamily="proto_mono"
        >
          Sample Text
        </Button>

        <Button
          color="secondary"
          icon={{
            url: "/tokens/canto.svg",
            position: "right",
          }}
          fontFamily="proto_mono"
        >
          Sample Text
        </Button>
        <Button
          color="accent"
          icon={{
            url: "/tokens/canto.svg",
            position: "right",
          }}
          fontFamily="proto_mono"
        >
          Sample Text
        </Button>
      </div>
    </div>
  );
}
