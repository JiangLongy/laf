import {
  Button,
  ButtonGroup,
  Popover,
  PopoverContent,
  PopoverTrigger,
  useDisclosure,
} from "@chakra-ui/react";
import { t } from "i18next";

import { RecycleDeleteIcon } from "@/components/CommonIcon";
import IconWrap from "@/components/IconWrap";

export default function DeleteButton(props: { data: any; deleteMethod: any }) {
  const { isOpen, onToggle, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Popover
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        closeOnBlur={true}
        placement="left"
      >
        <IconWrap
          className="group/icon hover:bg-rose-100"
          showBg
          tooltip={t("Delete").toString()}
          size={32}
          onClick={(event: any) => {
            onToggle();
            event?.stopPropagation();
          }}
        >
          <PopoverTrigger>
            <RecycleDeleteIcon
              fontSize={16}
              className="align-middle group-hover/icon:text-error-500"
            />
          </PopoverTrigger>
        </IconWrap>
        <PopoverContent p="2" maxWidth={130}>
          <ButtonGroup size="xs">
            <Button
              variant="outline"
              onClick={(event) => {
                event?.stopPropagation();
                onClose();
              }}
            >
              {t("Cancel")}
            </Button>
            <Button
              isLoading={props.deleteMethod.isLoading}
              onClick={async (event) => {
                event?.stopPropagation();
                await props.deleteMethod.mutateAsync(props.data);
              }}
            >
              {t("Confirm")}
            </Button>
          </ButtonGroup>
        </PopoverContent>
      </Popover>
    </>
  );
}
