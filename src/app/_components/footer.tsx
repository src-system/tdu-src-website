import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="bg-charcoal text-white">
      <div className="mx-auto max-w-6xl px-8 py-12">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <h3 className="mb-4 text-lg font-bold">ソフトウェア研究部</h3>
            <p className="text-sm text-gray-300">
              東京電機大学 千住キャンパス
              <br />
              学術研究部会所属
            </p>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-bold">Links</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <Link href="/about" className="hover:text-white">
                  About
                </Link>
              </li>
              <li>
                <Link href="/team" className="hover:text-white">
                  Team
                </Link>
              </li>
              <li>
                <Link href="/sofchara" className="hover:text-white">
                  CHARACTERS
                </Link>
              </li>
              <li>
                <Link href="/news" className="hover:text-white">
                  NEWS
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-bold">Contact</h3>
            <p className="text-sm text-gray-300">E-Mail: softwareresearchclub@gmail.com</p>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-500 pt-8 text-center text-sm text-gray-400">
          &copy; {new Date().getFullYear()} ソフトウェア研究部
        </div>
      </div>
    </footer>
  );
};
