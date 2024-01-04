import Button from "@/components/button/button";
import Container from "@/components/container/container";
import Icon from "@/components/icon/icon";
import Spacer from "@/components/layout/spacer";
import Modal from "@/components/modal/modal";
import Text from "@/components/text";

interface Props {
  open: boolean;
  onConfirm: () => void;
  onReselectMethod: () => void;
  onClose: () => void;
}
const GravityConfirmationModal = ({
  open,
  onClose,
  onConfirm,
  onReselectMethod,
}: Props) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Container
        width="100%"
        center={{ horizontal: true }}
        style={{ display: "flex", margin: "20px 0" }}
      >
        <Icon
          icon={{
            url: "/warning.svg",
            size: 44,
          }}
          themed
        />
      </Container>
      <Text size="sm">
        Please be aware that using a wallet that does not support custom chains
        while bridging out, such as Rabby, may result in inaccessible funds.
        <Spacer height="10px" />
        We recommend Metamask for bridging out to Ethereum.
        <Spacer height="10px" />
        Alternatively, transfer funds to Gravity Bridge and use the Gravity
        Bridge Portal to transfer funds from Gravity to Ethereum.
      </Text>
      <Spacer height="30px" />
      <Container gap={20} direction="row" center={{ horizontal: true }}>
        <Button onClick={onConfirm}>CONTINUE</Button>{" "}
        <Button onClick={onReselectMethod}>USE GB PORTAL</Button>
      </Container>
    </Modal>
  );
};

export default GravityConfirmationModal;