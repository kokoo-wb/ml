/**
 *   Author zhuhuishao
 *   Name commonValidate
 *   
 *   功能： 配置全局的表单校验,用于校验非空, 电话，邮箱等
 *   描述： --------------------------------------------
 */
var commonValidate = function() {

    var inputValidate = function() {
        var inputList = $('input');
        var validateResult = {
            status: true,
            message: ''
        }

        $.each(inputList, function() {
            // 校验是否为空
            if ($(this).attr('name') == 'required') {
                if ($(this).val() == '') {
                    validateResult.status = false;
                    validateResult.message = $(this).attr('data') + '不能为空';
                    return false;
                }
            }
        });

        return validateResult;
    }

    return {
        inputValidate: function() {
            return inputValidate();
        }
    }
}();





/**
 *   Author zhuhuishao
 *   Name commonPlugins
 *   
 *   功能： 提供全局公共组件 包括Modal Select Button 等
 *   描述： --------------------------------------------
 */
var commonPlugins = function() {

    /**
     * [展开confrim Modal对话框]
     * @param [string] id [modal id]
     * @return [type] name [desc]
     */
    var confrimModal = function(obj) {
        $('body').css('overflow', 'hidden');
        $('body').append('<div class="confrim-modal">' +
            '<div class="confirm-content">' +
            '<p class="confirm-title">' + obj.title + '</p>' +
            '<div class="confirm-btn-area">' +
            '<a class="cancel-btn">' + (obj.cancelName || '取消') + '</a>' +
            '<a class="confirm-btn">' + (obj.confirmName || '确认') + '</a>' +
            '</div></div></div>');

        if (obj && obj.onOk) {
            $('.confirm-btn').on('click', function() {
                obj.onOk();
            })
        }

        if (obj && obj.onCancel) {
            $('.cancel-btn').on('click', function() {
                obj.onCancel();
            })
        }
    }


    /**
     * [关闭confirrm Modal对话框]
     * @param [type] name [desc]
     * @return [type] name [desc]
     */
    var closeConfirmModal = function() {
        $('body').css('overflow', 'visible');
        $('.confrim-modal').remove();
    }


    /**
     * [展开alert Modal对话框]
     * @param [string] id [modal id]
     * @return [type] name [desc]
     */
    var alertModal = function(obj) {
        $('body').css('overflow', 'hidden');
        $('body').append('<div class="alert-modal">' +
            '<div class="alert-content">' +
            '<p class="alert-title">' + obj.content + '</p>' +
            '<a class="alert-ok-btn">' + (obj.btnName || '确定') + '</a></div></div>');

        if (obj && obj.onOk) {
            $('.alert-ok-btn').on('click', function() {
                obj.onOk();
            })
        }
    }

    /**
     * [关闭alert Modal对话框]
     * @param [type] name [desc]
     * @return [type] name [desc]
     */
    var closeAlertModal = function() {
        $('body').css('overflow', 'visible');
        $('.alert-modal').remove();
    }


    /**
     * [展开message提示框]
     * @param [string] text [展示的内容]
     * @return [number] time [展示的时间, 默认1000ms, 单位ms]
     */
    var messageModal = function(text, time) {
        $('body').css('overflow', 'hidden');
        $('.common_loading').remove();
        $('body').append('<div class="common_loading"><span class="common_loading_msg">' + text + '</span></div>');
        $(".common_loading").show();

        if (time) {
            setTimeout(function() {
                hideMessage();
            }, time);
        } else {
            setTimeout(function() {
                hideMessage();
            }, 1000);
        }
    }

    /**
     * [关闭message提示框]
     * @param [type] name [desc]
     * @return [type] name [desc]
     */
    var hideMessage = function() {
        $('body').css('overflow', 'visible');
        $('.common_loading').remove();
    }

    return {
        confrimModal: function(obj) {
            return confrimModal(obj);
        },
        closeConfirmModal: function() {
            return closeConfirmModal();
        },
        alertModal: function(obj) {
            return alertModal(obj);
        },
        closeAlertModal: function() {
            return closeAlertModal();
        },
        messageModal: function(text, time) {
            return messageModal(text, time);
        },
        hideMessage: function() {
            return hideMessage();
        }
    }
}();