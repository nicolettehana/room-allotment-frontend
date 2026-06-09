import { Box, IconButton, Image, Skeleton, Tooltip } from "@chakra-ui/react";
import { MdOutlineRefresh } from "react-icons/md";

const CaptchaImage = ({ query }) => {
  return (
    <Box
      pos="relative"
      border="1px"
      borderColor="border"
      rounded="md"
      overflow="hidden"
    >
      <Skeleton isLoaded={!query.isPending} h={100} fadeDuration={1}>
        <Image
          src={query?.data?.data?.captchaImage}
          alt="Captcha Image"
          objectFit="fill"
          w="full"
          h="full"
        />
      </Skeleton>
      <Tooltip label="Refresh Captcha">
        <IconButton
          variant="brand"
          icon={<MdOutlineRefresh size={20} />}
          pos="absolute"
          top={2}
          right={2}
          onClick={() => query.refetch()}
        />
      </Tooltip>
    </Box>
  );
};

export default CaptchaImage;
