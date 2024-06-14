import { useTheme } from "@chakra-ui/react";

export default function useColorFormatConverter(){

    const theme = useTheme();

    return (colorCode) => {
        const strs = colorCode.split(".");
        try {
            const color = theme.colors[strs[0]][strs[1]];
            if (color) return color;
            else return 'black';
        } catch (e) {
            return 'black';
        }
    }
}