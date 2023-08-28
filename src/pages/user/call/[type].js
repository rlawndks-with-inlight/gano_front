import { Icon } from "@iconify/react";
import { Button, FormControlLabel, Radio, TextField } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useState } from "react";
import { InputTitle, Row, SmallTitle, Title, Wrappers, themeObj } from "src/components/elements/styled-components";
import BlankLayout from "src/layouts/blank/BlankLayout";
import { m } from 'framer-motion'
import { varFade } from "src/components/animate";
import styled from "styled-components";
import SelectAddress from "src/views/user/SelectAddress";
import PayComponent from "src/views/user/PayComponent";

const SelectText = styled.div`
margin: 1.5rem auto 0.5rem 1rem;
font-size:${themeObj.font_size.size7};
cursor:pointer;
color:${themeObj.main_color.color3};
white-space:pre;
`
let status_list = [
    '머리가 아파요',
    '팔/ 다리가 아파요',
    '배가 아파요',
    '숨쉬기가 힘들어요',
]
let walk_list = [
    '걸을 수 있어요',
    '부축해 주세요',
    '목발 / 휠체어 있어요',
    '못 걸어요',
]
let hospital_list = [
    '네, 있어요',
    '어디로 가야할지 모르겠어요\n상의하고싶어요',
]
let meet_list = [
    '집앞으로 와주세요',
    '병원에서 만나요',
    '집 근처에서 만날래요',
]
let meet_title_list = [
    '계신 곳을 입력해주세요',
    '병원을 입력해주세요',
    '만날 곳을 입력해주세요',
]
let later_list = [
    {
        title: '30분 안에 와주세요',
        value: 30
    },
    {
        title: '1시간 후에 와주세요',
        value: 60
    },
    {
        title: '2시간 후에 와주세요',
        value: 120
    },
]
let use_hour_list = [
    {
        title: '2시간',
        value: 2
    },
    {
        title: '3시간',
        value: 3
    },
    {
        title: '4시간 이상',
        value: 4
    },
    {
        title: '예상 하기가 어려워요',
        value: 0
    },
]
let sex_list = [
    '여자',
    '남자',
    '상관없어요',
]
let pay_list = [
    '카드 결제',
    '충전 결제',
    '휴대폰 결제',
]
let card_company_list = [
    '국민',
    '신한',
    '비씨',
    '삼성',
    '현대',
    '농협',
    '롯데',
    '하나',
    '우리',
    '씨티',
    '광주은행',
    '수협',
    '전북은행',
    '우체국',
    '제주',
    'MG새마을',
    '신협',
    '카카오뱅크',
]
const ImmediatelyCall = () => {
    const router = useRouter();

    const [windowStep, setWindowStep] = useState(0);
    const [activeStep, setActiveStep] = useState(0);
    const [notWantWelcome, setNotWantWelcome] = useState(false);
    const [patientCondition, setPatientCondition] = useState({
        status: undefined,
        status_text: '',
        status_confirm: false,
        walk: undefined,
        hospital: undefined,
        meet: undefined,
    })
    const [nurse, setNurse] = useState({
        later_time: undefined,
        use_hour: undefined,
        sex: undefined
    });
    const [isConfirmPatientCondition, setIsConfirmPatientCondition] = useState(false);
    const [wantCheckPatientCondition, setWantCheckPatientCondition] = useState(false);
    const [isOpenAddressComponent, setIsOpenAddressComponent] = useState(false);
    const [isOpenPayComponent, setIsOpenPayComponent] = useState(true);
    const [selectAddress, setSelectAddress] = useState(undefined);
    const [payType, setPayType] = useState(undefined);
    const [cardCompanyType, setCardCompanyType] = useState(undefined);
    useEffect(() => {

    }, [])
    const isDisableButton = () => {
        if (activeStep == 0) {
            return false;
        }
        if (activeStep == 1) {
            if (patientCondition.status >= 0) {
                if (patientCondition.status == status_list.length) {
                    if (patientCondition.status_confirm) {
                        onClickNextStep();
                    }
                } else {
                    onClickNextStep();
                }
            }
        }
        if (activeStep == 2) {
            if (patientCondition.walk >= 0) {
                onClickNextStep();

            }
        }
        if (activeStep == 3) {
            if (patientCondition.hospital >= 0) {
                onClickNextStep();

            }
        }
        if (activeStep == 4) {
            if (patientCondition.meet >= 0) {
                setWantCheckPatientCondition(true);
            }
        }
        if (activeStep == 5) {//언제 만날까요
            if (nurse.later_time >= 0) {
                onClickNextStep();
            }
        }
        if (activeStep == 6) {//이용시간
            if (nurse.use_hour >= 0) {
                onClickNextStep();
            }
        }
        if (activeStep == 7) {//만날간호사 성별
            if (nurse.sex >= 0) {
                onClickNextStep();
            }
        }
        return true;
    }
    const onClickNextStep = async () => {
        setActiveStep(activeStep + 1);
    }
    const onCheckPatientCondition = () => {
        setWantCheckPatientCondition(true);
    }
    useEffect(() => {
        isDisableButton();
        if (patientCondition.walk >= 0 && patientCondition.walk >= 0 && patientCondition.walk >= 0 && patientCondition.walk >= 0) {
            setIsConfirmPatientCondition(true);
        } else {
            setIsConfirmPatientCondition(false);
        }
    }, [patientCondition, nurse])
    useEffect(() => {
        if (activeStep <= 0) {
            setWindowStep(0);
        } else if (activeStep <= 4) {
            setWindowStep(1);
        } else if (activeStep <= 7) {
            setWindowStep(2);
        } else if (activeStep <= 8) {
            setWindowStep(3);
        }
    }, [activeStep])
    const onSelectAddress = (item) => {
        setSelectAddress(item);
        setIsOpenAddressComponent(false);
        if (router.query?.type == 'immediately') {//즉시호출
            setActiveStep(5);
        } else if (router.query?.type == 'reservation') {//예약호출
            setActiveStep(6);
        }
    }
    const isPossiblePay = () => {
        if (payType >= 0) {
            if (payType == 0) {
                if (cardCompanyType >= 0) {
                    return true;
                } else {
                    return false
                }
            }
            return true;
        }
    }
    if (wantCheckPatientCondition) {
        return (
            <>
                <Wrappers style={{
                    height: '100vh',
                }}>
                    <m.div variants={varFade().inRight}>
                        <Title>이전 설정 확인</Title>
                        {patientCondition.status >= 0 &&
                            <>
                                <InputTitle>어디가 불편해요</InputTitle>

                                <Row style={{ margin: '1rem' }} onClick={() => {
                                    setWantCheckPatientCondition(false);
                                    setActiveStep(1)
                                }}>
                                    <SelectText style={{ color: themeObj.main_color.color1, margin: '0' }} >{status_list[patientCondition.status] || patientCondition.status_text}</SelectText>
                                    <Icon icon={'ps:down'} style={{ margin: '0 0 0 auto' }} />
                                </Row>
                            </>}
                        {patientCondition.walk >= 0 &&
                            <>
                                <InputTitle>걷는 것은 어때요</InputTitle>
                                <Row style={{ margin: '1rem' }} onClick={() => {
                                    setWantCheckPatientCondition(false);
                                    setActiveStep(2)
                                }}>
                                    <SelectText style={{ color: themeObj.main_color.color1, margin: '0' }} >{walk_list[patientCondition.walk]}</SelectText>
                                    <Icon icon={'ps:down'} style={{ margin: '0 0 0 auto' }} />
                                </Row>


                            </>}
                        {patientCondition.hospital >= 0 &&
                            <>
                                <InputTitle>다니던 병원이 있나요</InputTitle>
                                <Row style={{ margin: '1rem' }} onClick={() => {
                                    setWantCheckPatientCondition(false);
                                    setActiveStep(3)
                                }}>
                                    <SelectText style={{ color: themeObj.main_color.color1, margin: '0' }} >{hospital_list[patientCondition.hospital]}</SelectText>
                                    <Icon icon={'ps:down'} style={{ margin: '0 0 0 auto' }} />
                                </Row>

                            </>}
                        {patientCondition.meet >= 0 &&
                            <>
                                <InputTitle>어디서 만날까요</InputTitle>
                                <Row style={{ margin: '1rem' }} onClick={() => {
                                    setWantCheckPatientCondition(false);
                                    setActiveStep(4)
                                }}>
                                    <SelectText style={{ color: themeObj.main_color.color1, margin: '0' }}>{meet_list[patientCondition.meet]}</SelectText>
                                    <Icon icon={'ps:down'} style={{ margin: '0 0 0 auto' }} />
                                </Row>

                            </>}
                    </m.div>
                    <Button variant="contained" size="large" sx={{ margin: 'auto 0 1rem 0' }} onClick={() => {
                        if (isConfirmPatientCondition) {
                            setIsOpenAddressComponent(true);
                        }
                        setWantCheckPatientCondition(false);
                    }}>{isConfirmPatientCondition ? '이 설정으로 호출' : '이전설정확인'}</Button>
                </Wrappers>

            </>
        )
    }
    if (isOpenAddressComponent) {
        return (
            <>
                <SelectAddress title={meet_title_list[patientCondition.meet ?? 0]} onSelectAddress={onSelectAddress} />
            </>
        )
    }
    if (isOpenPayComponent) {
        return (
            <>
                <PayComponent />
            </>
        )
    }
    return (
        <>
            <Wrappers style={{
                height: '100vh',
            }}>
                {windowStep == 0 &&
                    <>
                        {activeStep == 0 &&
                            <>
                                <m.div variants={varFade().inRight}>
                                    <Title style={{ marginBottom: '0' }}>가노를 <br />호출할게요</Title>
                                </m.div>
                                <m.div variants={varFade().inRight}>
                                    <Title style={{ fontWeight: 'normal' }}>환영문구</Title>
                                </m.div>
                                <m.div variants={varFade().inRight} style={{ width: '100%', marginTop: 'auto', display: 'flex', flexDirection: 'column' }}>
                                    <Row style={{
                                        alignItems: 'center',
                                        margin: 'auto auto 0 auto',
                                        cursor: 'pointer',
                                        color: `${notWantWelcome ? themeObj.main_color.color1 : themeObj.main_color.color3}`
                                    }}
                                        onClick={() => {
                                            setNotWantWelcome(true);
                                        }}
                                    >
                                        <Icon icon={`icon-park-${notWantWelcome ? 'solid' : 'outline'}:check-one`} style={{ marginRight: '0.5rem', fontSize: '24px' }} />
                                        <div style={{ fontSize: themeObj.font_size.size8 }}>다음에는 이 화면 없이 시작하기</div>
                                    </Row>
                                    <Button variant="contained" size="large" sx={{ margin: '1rem 0' }} disabled={isDisableButton()} onClick={onClickNextStep}>시작하기</Button>
                                </m.div>
                            </>}

                    </>}
                {windowStep == 1 &&
                    <>
                        {activeStep == 1 ?
                            <>
                                <m.div variants={varFade().inRight}>
                                    <Title>나의 환경을 <br />선택해주세요</Title>
                                </m.div>
                            </>
                            :
                            <>
                                <div style={{ marginTop: '148px' }} />
                            </>}

                        {activeStep == 1 &&
                            <>
                                <m.div variants={varFade().inRight}>
                                    <InputTitle>어디가 불편해요</InputTitle>

                                    {status_list.map((itm, idx) => (
                                        <>
                                            <SelectText style={{ color: `${patientCondition?.status == idx ? themeObj.main_color.color1 : ''}` }} onClick={() => {
                                                setPatientCondition({
                                                    ...patientCondition,
                                                    status: idx,
                                                    status_text: '',
                                                    status_confirm: false,
                                                })
                                            }}>{itm}</SelectText>
                                        </>
                                    ))}
                                    <SelectText style={{ color: `${patientCondition?.status == status_list.length ? themeObj.main_color.color1 : ''}` }} onClick={() => {
                                        setPatientCondition({
                                            ...patientCondition,
                                            status: status_list.length
                                        })
                                    }}>직접입력</SelectText>
                                    {patientCondition.status == status_list.length &&
                                        <>
                                            <m.div variants={varFade().inRight} style={{ width: '100%' }}>
                                                <Row style={{ alignItems: 'center' }}>
                                                    <TextField
                                                        variant="standard"
                                                        style={{ margin: '0.5rem 1rem', width: '80%' }}
                                                        inputProps={{
                                                            style: {
                                                                padding: '1rem 0.5rem'
                                                            },
                                                        }}
                                                        value={patientCondition.status_text}
                                                        onChange={(e) => {
                                                            setPatientCondition({
                                                                ...patientCondition,
                                                                ['status_text']: e.target.value
                                                            })
                                                        }}
                                                    />
                                                    <Button
                                                        style={{ background: themeObj.main_color.color3, width: '112px', marginLeft: '0.5rem', height: '55px' }}
                                                        variant="contained"
                                                        onClick={() => {
                                                            setPatientCondition({
                                                                ...patientCondition,
                                                                status_confirm: true,
                                                            })
                                                        }}
                                                    >
                                                        작성완료
                                                    </Button>
                                                </Row>

                                            </m.div>
                                        </>}

                                </m.div>
                            </>}
                        {activeStep == 2 &&
                            <>
                                <m.div variants={varFade().inRight}>
                                    <InputTitle>걷는 것은 어때요</InputTitle>

                                    {walk_list.map((itm, idx) => (
                                        <>
                                            <SelectText style={{ color: `${patientCondition?.walk == idx ? themeObj.main_color.color1 : ''}` }} onClick={() => {
                                                setPatientCondition({
                                                    ...patientCondition,
                                                    walk: idx
                                                })
                                            }}>{itm}</SelectText>
                                        </>
                                    ))}
                                </m.div>
                            </>}
                        {activeStep == 3 &&
                            <>
                                <m.div variants={varFade().inRight}>
                                    <InputTitle>다니던 병원이 있나요</InputTitle>

                                    {hospital_list.map((itm, idx) => (
                                        <>
                                            <SelectText style={{ color: `${patientCondition?.hospital == idx ? themeObj.main_color.color1 : ''}` }} onClick={() => {
                                                setPatientCondition({
                                                    ...patientCondition,
                                                    hospital: idx
                                                })
                                            }}>{itm}</SelectText>
                                        </>
                                    ))}
                                </m.div>
                            </>}
                        {activeStep == 4 &&
                            <>
                                <m.div variants={varFade().inRight}>
                                    <InputTitle>어디서 만날까요</InputTitle>

                                    {meet_list.map((itm, idx) => (
                                        <>
                                            {(idx != 1 || patientCondition.hospital == 0) &&
                                                <>
                                                    <SelectText style={{ color: `${patientCondition?.meet == idx ? themeObj.main_color.color1 : ''}` }} onClick={() => {
                                                        setPatientCondition({
                                                            ...patientCondition,
                                                            meet: idx
                                                        })
                                                    }}>{itm}</SelectText>
                                                </>}
                                        </>
                                    ))}
                                </m.div>
                            </>}
                        <Button variant="contained" size="large" sx={{ margin: 'auto 0 1rem 0' }} onClick={onCheckPatientCondition}>이전설정확인</Button>

                    </>}
                {windowStep == 2 &&
                    <>
                        <div style={{ marginTop: '148px' }} />
                        {activeStep == 5 &&
                            <>
                                <m.div variants={varFade().inRight}>
                                    <InputTitle>언제 만날까요</InputTitle>

                                    {later_list.map((itm, idx) => (
                                        <>
                                            <SelectText style={{ color: `${nurse?.later_time == idx ? themeObj.main_color.color1 : ''}` }} onClick={() => {
                                                setNurse({
                                                    ...nurse,
                                                    later_time: idx
                                                })
                                            }}>{itm.title}</SelectText>
                                        </>
                                    ))}
                                </m.div>
                            </>}
                        {activeStep == 6 &&
                            <>
                                <m.div variants={varFade().inRight}>
                                    <InputTitle>이용 시간을 알려주세요</InputTitle>

                                    {use_hour_list.map((itm, idx) => (
                                        <>
                                            <SelectText style={{ color: `${nurse?.use_hour == idx ? themeObj.main_color.color1 : ''}` }} onClick={() => {
                                                setNurse({
                                                    ...nurse,
                                                    use_hour: idx
                                                })
                                            }}>{itm.title}</SelectText>
                                        </>
                                    ))}
                                </m.div>
                            </>}
                        {activeStep == 7 &&
                            <>
                                <m.div variants={varFade().inRight}>
                                    <InputTitle>만날 간호사의 성별은요</InputTitle>

                                    {sex_list.map((itm, idx) => (
                                        <>
                                            <SelectText style={{ color: `${nurse?.sex == idx ? themeObj.main_color.color1 : ''}` }} onClick={() => {
                                                setNurse({
                                                    ...nurse,
                                                    sex: idx
                                                })
                                            }}>{itm}</SelectText>
                                        </>
                                    ))}
                                </m.div>
                            </>}
                    </>}
                {windowStep == 3 &&
                    <>
                        {activeStep == 8 &&
                            <>
                                <m.div variants={varFade().inRight}>
                                    <Title>결제</Title>
                                </m.div>
                                <m.div variants={varFade().inRight}>
                                    <InputTitle>결제 수단</InputTitle>
                                    {pay_list.map((itm, idx) => (
                                        <>
                                            <SelectText style={{ color: `${payType == idx ? themeObj.main_color.color1 : ''}`, display: 'flex', alignItems: 'center' }} onClick={() => {
                                                setPayType(idx)
                                            }}>
                                                <FormControlLabel value={idx} control={<Radio />} checked={payType == idx} label={itm} />
                                            </SelectText>
                                            {payType == 0 && idx == 0 &&
                                                <>
                                                    <TextField
                                                        variant="standard"
                                                        sx={{ width: '100%' }}
                                                        placeholder="카드 선택"
                                                        inputProps={{
                                                            style: {
                                                                padding: '1rem 0.5rem'
                                                            },
                                                        }}
                                                        InputProps={{
                                                            endAdornment: (
                                                                <Icon icon={'ps:down'} style={{ margin: '0.5rem' }} />
                                                            ),
                                                            readOnly: true
                                                        }}
                                                        value={card_company_list[cardCompanyType]}
                                                        onClick={() => {
                                                            setActiveStep(9);
                                                        }}
                                                        readOnly={true}
                                                    />
                                                </>}
                                        </>
                                    ))}
                                </m.div>
                                <m.div variants={varFade().inRight} style={{ width: '100%', marginTop: 'auto', display: 'flex', flexDirection: 'column' }}>
                                    <Row style={{
                                        alignItems: 'center',
                                        margin: 'auto auto 0 auto',
                                        color: `${themeObj.main_color.color3}`
                                    }}
                                    >
                                        <Icon icon={`mdi:alert-circle`} style={{ marginRight: '0.5rem', fontSize: '24px' }} />
                                        <div style={{ fontSize: themeObj.font_size.size8 }}>정책 및 안내사항</div>
                                    </Row>
                                    <Button variant="contained" size="large" sx={{ margin: '1rem 0' }} disabled={!isPossiblePay()} onClick={() => { setIsOpenPayComponent(true) }}>결제하기</Button>
                                </m.div>
                            </>}
                        {activeStep == 9 &&
                            <>
                                <m.div variants={varFade().inRight}>
                                    <InputTitle style={{ marginTop: '3rem' }}>카드사 선택</InputTitle>
                                    <SmallTitle style={{ color: themeObj.main_color.color2 }}>결제에 사용할 카드를 선택해 주세요</SmallTitle>
                                    <Row style={{ flexWrap: 'wrap' }}>
                                        {card_company_list.map((itm, idx) => (
                                            <>
                                                <Button
                                                    variant="contained"
                                                    onClick={() => {
                                                        setCardCompanyType(idx);
                                                        setActiveStep(8);
                                                    }}
                                                    style={{
                                                        background: `${cardCompanyType != idx ? themeObj.main_color.color3 : ''}`,
                                                        width: '40%',
                                                        margin: '0.5rem auto',
                                                        height: '42px',
                                                        maxWidth: '200px'
                                                    }}>{itm}</Button>
                                            </>
                                        ))}
                                    </Row>
                                </m.div>
                            </>}
                    </>}
            </Wrappers >

        </>
    )
}
ImmediatelyCall.getLayout = (page) => <BlankLayout>{page}</BlankLayout>;
export default ImmediatelyCall;