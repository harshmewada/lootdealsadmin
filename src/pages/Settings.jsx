import { LoadingButton } from "@mui/lab";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CircularProgress,
  Divider,
} from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import FormCreator from "../components/FormCreator";
import { getSetting, editSettting } from "../redux/actions/settingActions";
import { loadingSelector } from "../redux/reducers/loadingReducer";
import { settingTypes } from "../redux/types";
const Settings = () => {
  const formRef = React.useRef();
  const dispatch = useDispatch();
  const { setting } = useSelector((state) => state.common);
  React.useEffect(() => {
    dispatch(getSetting());
  }, []);

  const handleSubmit = (values) => {
    dispatch(
      editSettting({
        data: values,
        callBack: () => {
          dispatch(getSetting());
        },
      })
    );
  };
  const isLoading = useSelector((state) =>
    loadingSelector(state, [
      settingTypes.GET_SETTING,
      settingTypes.UPDATE_SETTING,
    ])
  );
  return (
    <Card>
      <CardHeader title="Setting" />

      <Divider />
      <CardContent>
        {isLoading ? (
          <CircularProgress />
        ) : (
          <FormCreator
            ref={formRef}
            formFields={formFields}
            isSearchForm={false}
            formData={setting}
            onSubmit={(values) => handleSubmit(values)}
          />
        )}
      </CardContent>
      <Divider />
      <CardActions>
        <LoadingButton
          variant="contained"
          loading={isLoading}
          size="small"
          onClick={() => formRef.current.click()}
        >
          Update
        </LoadingButton>
      </CardActions>
    </Card>
  );
};

export default Settings;

const formFields = [
  {
    type: "text",
    name: "email",
    label: "Email Address",
    placeholder: "Enter Email Address",
    required: false,
    disabled: false,
    readOnly: false,
    width: 12,
  },
  {
    type: "text",
    name: "telegramLink",
    label: "Telegram Link",
    placeholder: "Enter Telegram Link",
    required: false,
    disabled: false,
    readOnly: false,
    width: 12,
  },
  {
    type: "text",
    name: "youtubeLink",
    label: "Youtube Link",
    placeholder: "Enter Youtube Link",
    required: false,
    disabled: false,
    readOnly: false,
    width: 12,
  },
  {
    type: "text",
    name: "privacyLink",
    label: "Privacy Link",
    placeholder: "Enter Privacy Link",
    required: false,
    disabled: false,
    readOnly: false,
    width: 12,
  },

  {
    type: "text",
    name: "telegramBannerLink",
    label: "Telegram Link",
    placeholder: "Enter Telegram Link",
    required: false,
    disabled: false,
    readOnly: false,
    width: 12,
  },

  {
    type: "boolean",
    name: "showAds",
    label: "Enable Ads",
    placeholder: " Enable Ads",
    required: false,
    disabled: false,
    readOnly: false,
    width: 4,
  },
  {
    type: "boolean",
    name: "showTelegramBanner",
    label: "Show Telegram Banner in App",
    placeholder: "Enter Telegram Banner",
    required: false,
    disabled: false,
    readOnly: false,
    width: 4,
  },

  {
    type: "image",
    name: "telegramBannerImage",
    label: "Choose Telegram Banner Image",
    placeholder: "Choose Telegram Banner Image",
    required: true,
    disabled: false,
    readOnly: false,
    width: 4,
  },
];
