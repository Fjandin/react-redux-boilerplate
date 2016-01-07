import reactMixin from "react-mixin";

export default (ClassObject, ...mixins) => {
    mixins.forEach((mixin) => reactMixin.onClass(ClassObject, mixin));
};
