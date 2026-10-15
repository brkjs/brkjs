// ©2025 04-17 13:46

const nop: any = () => {};

/**
 * A runtime helper.
 *
 * 类似于 marked 声明式的虚拟揭耦库；
 *
 * 初步目标是一个自用的产品，进阶目标是开源的标准库！
 */
export const brk: Brk = globalThis._zyu_ || {
	// @ts-ignore
	_load: (target) => import(target),
	_open: nop, opens: nop,
	builder: globalThis['-builder-'],
	env: {},
	tries: call => {
		try {
			return call();
		} catch (ex) {}
	},
	v: {}, // cached: {},
	// 用于组件间通信，根据组件的生命周期来；
	weak: new WeakMap(),
};

globalThis['_zyu_'] = brk;

brk._port = (mod) => {
	const _id = document.currentScript?.src;
	if (brk._id) {brk.v[brk._id] = mod;}
};

brk.awc = (props) => {
	// 检测是否存在视图
	// 1. 想要的视图，有就有，没有就默认；
	// 2. 想要的视图；
	const View = props.raw.vino;
	if (View) {
		if (props.vuv) {
			const view = props.raw[props.vuv] || View;
			return view(props);
		}
		return View(props);
	}

	if (props.vuv) {
		props.loaded = v => {
			const preferred = v[props.vuv] || v.vino;
			return preferred(props);
		};
	}
	return brk.loads(props);
};

// species
interface Brk {
	card: any;
	html: any;
	link: any;
	// global caches
	v: any; // cached: any;

	/**
	 * Defined Dynamic View 渲染一个动态的视图
	 * @param view 原始视图
	 */
	dfv: <T, X>(
		// view: (state: Dynamic, props: Constant) => HTMLDivElement,
		view: (v: T, x: X) => HTMLDivElement,  // props?: X,
		ctx: X,
	) => { update: (v: T) => any, view: (v: T) => HTMLDivElement };

	env: {
		// 默认的提醒，慎用？需要谨慎添加声音
		// 一个最简单的默认提示音 🔔
		// 触发条件：比如，按键、开始执行、任务节点
		beep?: () => any;
		calls?: (key: string, body: any, note: string) => any;
		opens?: (kind: string, it: any, ext?: any) => any;
	};

	// icon: (path: string, color?: string) => any;
	icon: (props: {
		d: string; c?: string;
		styles?: any
		sets?: [string, any][];
	}) => any;

	// load = import, port = export
	_load: (key: string) => Promise<any>;
	// or _link: (key: string) => any;
	// opens a regular link
	_open: (key: string, target?: string) => any;

	/**
	 * 加载一个异步组件！
	 */
	loads: (props: Loads) => any;
	// async web component
	awc: (props: Loads) => any;
	mark: any;

	/**
	 * 打开一个任意的目标
	 *
	 * or () => stb.mark.clicked(meta)
	 *
	 * @param meta 页面、应用或文档；
	 */
	opens: (meta: any) => any;

	builder?: {
		code: string;
		ztc: number;
	};

	_json: (path: string) => Promise<any>;
	_post: (path: string, body: any) => Promise<any>;
	_edit: (path: string, body: any) => Promise<any>;

	tries: (call: Function) => any;

	weak: WeakMap<any, any>;
}

interface Loads {
	raw: any;
	ssr?: any;
	opt?: any;
	vuv?: any;
	load?: string;
	loaded?: (v: any, props: any) => any;
}
