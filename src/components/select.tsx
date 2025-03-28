import { cn } from "@/lib/utils";

export function Select({ className = '', data = [], onInput = () => {}, ...props }: {
	className?: string,
	data?: { id: string, name: string, [key: string]: any }[],
	onInput?: FormEventHandler
}) {

	const baseClass = 'p-3 rounded-md border-[1px] border-solid border-[rgba(0, 0, 0, 0.75)] outline-none hover:cursor-pointer hover:brightness-95 transition-all';

	return (<select className={ cn(baseClass, className) } onInput={ onInput }>
		<option selected disabled>--</option>
		{ data.map(option => {
			return (<option key={ option.id } value={ option.id } className="p-2">
				{ option.name }
			</option>)
		}) }
	</select>)
}