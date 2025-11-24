import React from "react";

export default function Footer() {

    return (
            <footer className="bg-white backdrop-blur-sm shadow-sm font-playwrite py-10">
                <div className="container mx-auto grid gap-8 md:grid-cols-3">
                    <div>
                        <h3 className="text-lg font-semibold text-amber-700">99 Pub & Resort</h3>
                        <p className="mt-2 text-sm text-white-400">
                            Crafting your dream vacation and hospitality experience.
                        </p>
                    </div>

                    <div>
                        <h4 className="text-sm font-semibold text-black">Quick Links</h4>
                        <ul className="mt-3 space-y-2 text-sm">
                            <li><a href="#" className="hover:text-black">Home</a></li>
                            <li><a href="#" className="hover:text-black">About</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-sm font-semibold text-black">Contact</h4>
                        <p className="mt-3 text-sm text-zinc-400">
                            Email: support@xilentinc.com <br />
                            Phone: +1 (000) 123-456
                        </p>
                    </div>
                </div>

                <div className="mt-10 border-t border-zinc-00 pt-4 text-center text-sm text-zinc-500">
                    © {new Date().getFullYear()} Xilent Inc — All Rights Reserved.
                </div>
            </footer>
    )
}