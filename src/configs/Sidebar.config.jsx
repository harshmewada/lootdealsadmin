// component
import Iconify from "../components/layout/iconify/Iconify";
import SvgColor from "../components/layout/svg-color";

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor
    src={`/assets/icons/navbar/${name}.svg`}
    sx={{ width: 1, height: 1 }}
  />
);

const sidebarConfig = [
  {
    title: "dashboard",
    path: "/",
    // icon:    icon("ic_analytics"),
    icon: <Iconify icon="ic:twotone-monitor-heart" />,
  },
  {
    title: "offers",
    path: "/offers",
    icon: <Iconify icon="ic:twotone-discount" />,
  },
  {
    title: "products",
    path: "/products",
    icon: icon("ic_cart"),
  },
  {
    title: "categories",
    path: "/categories",
    icon: <Iconify icon="icon-park:category-management" />,
  },

  {
    title: "platforms",
    path: "/platforms",
    icon: <Iconify icon="ph:stack-duotone" />,
  },

  {
    title: "setting",
    path: "/setting",
    icon: <Iconify icon="ant-design:setting-twotone" />,
  },

  {
    title: "App Errors",
    path: "/apperrors",
    icon: <Iconify icon="ant-design:warning-twotone" />,
  },
  // {
  //   title: "blog",
  //   path: "/dashboard/blog",
  //   icon: icon("ic_blog"),
  // },
  // {
  //   title: "login",
  //   path: "/login",
  //   icon: icon("ic_lock"),
  // },
  // {
  //   title: "Not found",
  //   path: "/404",
  //   icon: icon("ic_disabled"),
  // },
];

export default sidebarConfig;
