"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var prop_types_1 = __importDefault(require("prop-types"));
var react_redux_1 = require("react-redux");
var react_router_dom_1 = require("react-router-dom");
var compose_1 = __importDefault(require("recompose/compose"));
var getContext_1 = __importDefault(require("recompose/getContext"));
var ra_core_1 = require("ra-core");
//import { isLoggedIn } from 'ra-core';
var ra_core_2 = require("ra-core");
var ra_core_3 = require("ra-core");
var welcomeStyles = {
    width: '50%',
    margin: '40vh',
    textAlign: 'center',
};
var CoreRouter = /** @class */ (function (_super) {
    __extends(CoreRouter, _super);
    function CoreRouter() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = { children: [] };
        _this.initializeResources = function (nextProps) {
            //if (typeof nextProps.children === 'function') {
            _this.initializeResourcesAsync(nextProps);
            //}
        };
        _this.initializeResourcesAsync = function (props) { return __awaiter(_this, void 0, void 0, function () {
            var authProvider, permissions, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        authProvider = props.authProvider;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        if (!authProvider) return [3 /*break*/, 3];
                        return [4 /*yield*/, authProvider(ra_core_1.AUTH_GET_PERMISSIONS)];
                    case 2:
                        permissions = _a.sent();
                        _a.label = 3;
                    case 3: return [3 /*break*/, 5];
                    case 4:
                        error_1 = _a.sent();
                        this.props.userLogout();
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        }); };
        return _this;
    }
    CoreRouter.prototype.componentWillMount = function () {
        this.initializeResources(this.props);
    };
    CoreRouter.prototype.componentWillReceiveProps = function (nextProps) {
        var _this = this;
        if (nextProps.isLoggedIn !== this.props.isLoggedIn) {
            this.setState({
                children: [],
            }, function () { return _this.initializeResources(nextProps); });
        }
    };
    CoreRouter.prototype.render = function () {
        var _this = this;
        var children = this.props.children;
        if (process.env.NODE_ENV !== 'production' &&
            typeof children !== 'function' &&
            !children) {
            return (react_1.default.createElement("div", { style: welcomeStyles },
                "React-admin is properly configured.",
                react_1.default.createElement("br", null),
                "Now you can add a first <Resource> as child of <Admin>."));
        }
        // if (
        //     typeof children === 'function' &&
        //     (!this.state.children || this.state.children.length === 0)
        // ) {
        //     return <Route path="/" key="loading" component={loading} />;
        // }
        //
        var childrenToRender = typeof children === 'function' ? this.state.children : children;
        return (react_1.default.createElement(react_router_dom_1.Route, { path: "/", render: function (routeProps) { return (react_1.default.createElement(ra_core_3.WithPermissions, __assign({}, routeProps, { render: function () { return _this.props.children; } }))); } }));
    };
    return CoreRouter;
}(react_1.Component));
exports.CoreRouter = CoreRouter;
var mapStateToProps = function (state) {
    return {
        isLoggedIn: state.admin.auth.isLoggedIn,
    };
};
exports.default = compose_1.default(getContext_1.default({
    authProvider: prop_types_1.default.func,
}), react_redux_1.connect(mapStateToProps, { userLogout: ra_core_2.userLogout }))(CoreRouter);
