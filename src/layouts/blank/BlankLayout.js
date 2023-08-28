import { useEffect } from "react";
import { useState } from "react";
import { MotionContainer } from "src/components/animate";
import { useSettingsContext } from "src/components/settings";

const BlankLayout = ({ children }) => {
    const { themeDnsData } = useSettingsContext();
    const [showLayout, setShowLayout] = useState(false);
    useEffect(() => {
        if (themeDnsData?.id) {
            setShowLayout(true)
        }
    }, [themeDnsData])
    if (!themeDnsData?.id) {
        return <></>
    }
    return (
        <>
            <MotionContainer style={{
                background: `#111`,
                color: `#fff`,
                minHeight: '100vh'
            }}>
                {children}
            </MotionContainer>

        </>
    )
}
export default BlankLayout;