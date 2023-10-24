import LanguageSwitcher from "./lang-toggle";
import { SelectLanguage } from "./selectLanguage";

export default function DashboardHead() {
  return (
    <>
      <div className="flex justify-between mt-3">
        <div>
            <h1 className="text-4xl font-extrabold bg-gradient-to-br bg-clip-text text-transparent from-slate-300 via-fuchsia-300 to-green-300">Dashboard head</h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam facere pariatur quae quis eos ut, doloremque ipsa voluptatibus dicta odit, iusto ullam impedit at in necessitatibus quas adipisci voluptate nemo.</p>
        </div>
        <SelectLanguage />
      </div>
    </>
  );
}
