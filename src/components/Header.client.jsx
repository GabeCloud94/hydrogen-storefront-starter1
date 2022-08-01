import { useUrl, Link, useCart } from "@shopify/hydrogen";
import { Drawer, useDrawer } from "./Drawer.client";
import { CartDetails } from "./CartDetails.client";
import { IoBasketOutline } from "react-icons/io5";

export default function Header({ shop }) {
  const { pathname } = useUrl();
  const { isOpen, openDrawer, closeDrawer } = useDrawer();

  const isHome = pathname === "/";
  return (
    <>
      <Drawer open={isOpen} onClose={closeDrawer}>
        <div className="grid">
          <Drawer.Title>
            <h2 className="sr-only">Cart Drawer</h2>
          </Drawer.Title>
          <CartDetails onClose={closeDrawer} />
        </div>
      </Drawer>
      <header
        role="banner"
        className={`flex items-center h-12 p-4 md:p-6 lg:p-10 sticky backdrop-blur-lg z-40 top-0 justify-evenly w-full gap-8 leading-none antialiased transition shadow-sm ${
          isHome
            ? "bg-background-main/80 dark:bg-contrast/60 text-text-color-main"
            : "bg-section-secondary/80 dark:bg-contrast/60"
        }`}
      >
        <Link className="font-bold text-2xl" to="/">
          {shop.name}
        </Link>

        <button
          onClick={openDrawer}
          className="flex items-center justify-center h-8 gap-2"
        >
          <IoBasketOutline size={32} />
          <CartBadge dark={isHome} />
        </button>
      </header>
    </>
  );
}

function CartBadge({ dark }) {
  const { totalQuantity } = useCart();

  if (totalQuantity < 1) {
    return null;
  }
  return (
    <div
      className={`${
        dark ? "text-text-color-main bg-black" : "bg-text-color-main text-black"
      }  text-xs font-medium subpixel-antialiased h-4 min-w-[0.75rem] flex items-center justify-center leading-none text-center rounded-full px-1.5 pb-px`}
    >
      <span>{totalQuantity}</span>
    </div>
  );
}
