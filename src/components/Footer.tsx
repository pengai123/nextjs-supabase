import Link from "next/link"
import Image from 'next/image'

export default function Footer() {
  const navigationItems = [
    {
      title: "Home",
      href: "/",
      description: "",
    },
    {
      title: "Services",
      description: "Managing a small business today is already tough.",
      items: [
        {
          title: "Website design",
          href: "/services",
        },
        {
          title: "Website hosting",
          href: "/services",
        },
        {
          title: "Domain setup",
          href: "/services",
        },
        {
          title: "Business Email setup",
          href: "/services",
        },
      ],
    },
    {
      title: "Company",
      description: "Managing a small business today is already tough.",
      items: [
        {
          title: "FAQ",
          href: "/faq",
        },
        {
          title: "About us",
          href: "/about",
        },
        {
          title: "Contact us",
          href: "/contact",
        },
      ],
    },
  ];

  const year = new Date().getFullYear()

  return (
    <section className="w-full py-8 bg-foreground text-background">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div className="flex gap-8 flex-col items-start">
            <div className="flex gap-2 flex-col">
              {/* <h2 className="text-2xl md:text-4xl tracking-tighter max-w-xl font-regular text-left">
                Hotlink Studio
              </h2> */}
              <Link href="/">
                <Image src="/logo.png" alt="logo" width={100} height={100} />
              </Link>
              <p className="max-w-lg leading-relaxed tracking-tight text-background/65 text-left">
                Connect you to the web, one hotlink at a time.
              </p>
            </div>
            <div className="flex gap-20 flex-row">
              {/* <div className="flex flex-col text-sm max-w-lg leading-relaxed tracking-tight text-background/65 text-left">
                <p>123 Example St</p>
                <p>City</p>
                <p>AZ 123123</p>
              </div> */}
              <div className="flex flex-col text-sm max-w-lg leading-relaxed tracking-tight text-background/65 text-left">
                <Link href="/" className="hover:text-custom-blue">Terms of service</Link>
                <Link href="/" className="hover:text-custom-blue">Privacy Policy</Link>
              </div>
            </div>
          </div>
          <div className="grid lg:grid-cols-3 gap-10 items-start">
            {navigationItems.map((item) => (
              <div
                key={item.title}
                className="flex text-base gap-1 flex-col items-start"
              >
                <div className="flex flex-col gap-2">
                  {item.href ? (
                    <Link
                      href={item.href}
                      className="flex justify-between items-center"
                    >
                      <span className="text-lg hover:text-custom-blue">{item.title}</span>
                    </Link>
                  ) : (
                    <p className="text-lg">{item.title}</p>
                  )}
                  {item.items &&
                    item.items.map((subItem) => (
                      <Link
                        key={subItem.title}
                        href={subItem.href}
                        className="flex justify-between items-center"
                      >
                        <span className="text-background/65 text-sm hover:text-custom-blue">
                          {subItem.title}
                        </span>
                      </Link>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-8 border-t pt-4 border-muted-foreground text-sm text-muted-foreground flex justify-center">
          <p>© {year} <Link href="/" className="hover:underline">Hotlink Studio</Link>. All rights reserved.</p>
          {/* <p>Powered By <Link href="https://www.hotlinkstudio.com/" target="_blank" className="hover:underline">Hotlink Studio</Link>.</p> */}
        </div>
      </div>
    </section>
  );
};