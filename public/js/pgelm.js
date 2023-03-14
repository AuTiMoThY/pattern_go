/*--------------------------------------*\
    Pattern Go
    element
    V 2020.0505.1
            by lohaslife AuOzzy
\*--------------------------------------*/
/*
* TOC
*
* pgElm
* - pgElm.popup  彈跳視窗1
* -- pgElm.popup.base(action, frmSetup)
* -- pgElm.popup.inner(action, frmSetup)
* - pgElm.dialog
* -- pgElm.dialog.base(action)
* -- pgElm.dialog.inner(action)
*/
/**
 * ---------------------------------------------------------------------------------
 * > pgElm
 */
var pgElm = (function(pgUI) {
    return {
        /**
         * >> pgElm.popup  彈跳視窗1
         */
        popup: (function(){
            let transToClassName = (string) => {
                switch(string){
                    case "popupLogin":
                        return "pgpopup_login"
                        break;
                    case "popupSignup":
                        return "pgpopup_signup"
                        break;
                }
            }

            return {
                // >>> pgElm.popup.base(action, frmSetup)
                base: function(action, frmSetup) {
                    var _ = this;
                    return `
                        <div class="pgpopup ${transToClassName(action)}">
                            <div class="pgpopup-bg"></div>
                            <div class="pgpopup-wrap">
                                <div class="pgpopup-close">
                                    <svg class="svg_icon icon-svg-close">
                                        <use xlink:href="#svg-close"></use>
                                    </svg>
                                </div>
                                <div class="pgpopup-container" id="${action}" data-simplebar data-simplebar-auto-hide="false">
                                    ${_.inner(action, frmSetup)}
                                </div>
                            </div>
                        </div>
                    `;
                },

                // >>> pgElm.popup.inner(action, frmSetup)
                inner: function(action, frmSetup) {
                    var html = "";
                    // 國籍碼
                    function buildNationalityCode(frmSetup){
                        var html = "";
                        var data = frmSetup.country[1];

                        $.each(data, function(index, val) {
                            html += `
                                <option value="${val.id}">${val.code}</option>
                            `;
                        });

                        return html;
                    }

                    // 國籍(企業用戶註冊)
                    function buildCountry(frmSetup){
                        var html = "";
                        var data = frmSetup.country[0];

                        $.each(data, function(index, val) {
                            console.log(index)
                            console.log(val)
                            html += `
                                <option value="${val.id}">${val.name}</option>
                            `;
                        });

                        return html;
                    }

                    // 登入
                    if (action == "popupLogin") {
                        html +=`
                            <div class="container-inner" >
                              <div class="pgpopup-hd">
                                <h1 class="pgpopup-title">快速登入</h1>
                                <div class="fast_login">
                                  <ul class="cf lis-n">
                                    <li class="fast_login-item fast_login-QQ">
                                        <a class="inner" href="javascript:;" target="_blank">
                                            <div class="fast_login-logo QQ-logo"><img src="public/images/QQ-logo.png" alt="QQ"></div>
                                            <div class="txt">QQ</div>
                                        </a>
                                    </li>
                                    <li class="fast_login-item fast_login-wechat">
                                        <a class="inner" href="javascript:;" target="_blank">
                                            <div class="fast_login-logo wechat-logo"><img src="public/images/wechat-logo.png" alt="微信"></div>
                                            <div class="txt">微信</div>
                                        </a>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                              <div class="pgpopup-bd">
                                <h1 class="pgpopup-title">一般登入</h1>
                                <div class="login_frm pgfrm">
                                  <form action="" method="POST">
                                    <div class="form-group login_frm-email">
                                      <label class="pgfrm-label" for="Email">Email 帐号</label>
                                      <div class="pgfrm-field input-group">
                                        <input class="pgfrm-input" id="Email" type="email" name="Email" placeholder="service@ai-pattern.com">
                                        <span class="login_frm-change input-group-append to-phone">手机登入</span>
                                      </div>
                                    </div>
                                    <div class="form-group login_frm-phone">
                                      <label class="pgfrm-label" for="Phone">手机号码</label>
                                      <div class="pgfrm-field input-group">
                                        <select id="nationalityCode" name="nationalityCode" class="pgfrm-select nationality_code input-group-prepend">
                                          <option value="0">国籍码</option>
                                          ${buildNationalityCode(frmSetup)}
                                        </select>
                                        <input class="pgfrm-input" id="Phone" type="phone" name="Phone" placeholder="手机号码">
                                        <span class="login_frm-change input-group-append to-email">信箱登入</span>
                                      </div>
                                    </div>
                                    <div class="form-group login_frm-pw">
                                      <label class="pgfrm-label" for="Password">密碼</label>
                                      <div class="pgfrm-field">
                                        <div class="is_hidden">
                                          <svg class="svg_icon icon-hidden">
                                            <use xlink:href="#hidden"></use>
                                          </svg>
                                        </div>
                                        <input class="pgfrm-input" id="Password" type="password" name="Password" placeholder="請輸入密码">
                                      </div>
                                    </div>
                                    <div class="form-group login_frm-remember">
                                      <div class="au_radiocheckbox">
                                        <label class="au_radiocheckbox-label" for="rememberMee">
                                          <input class="au_radiocheckbox-input" id="rememberMee" type="checkbox" name="rememberMee">
                                          <div class="choicemark">
                                            <div class="choicemark-bg"></div>
                                          </div>
                                          <div class="txt">记住我</div>
                                        </label>
                                      </div>
                                    </div>
                                    <div class="form-group login_frm-btns">
                                      <button class="pgfrm-btn pgbtn pgbtn-s2 js-login_frm-submit" type="button">登入</button>
                                    </div>
                                    <div class="form-group login_frm-other">
                                      <a class="other-link js-to-signup left txt-r02" href="javascript:;">还没有帐户？去注册</a>
                                      <a class="other-link js-show-forgetpw right txt-gray4" href="javascript:;">忘记密码？</a>
                                    </div>
                                  </form>
                                </div>
                                <div class="forget_pw">
                                  <h1 class="pgpopup-title">忘记密码</h1>
                                  <div class="forget_frm pgfrm">
                                    <form action="" method="POST">
                                      <div class="form-group forget_frm-email">
                                        <label class="pgfrm-label" for="ForgetPW">发送电子邮件确认信</label>
                                        <div class="pgfrm-field">
                                          <input class="pgfrm-input" id="ForgetPW" type="email" name="ForgetPW" placeholder="请输入注册时的电子信箱">
                                        </div>
                                      </div>
                                      <div class="form-group login_frm-btns">
                                        <button class="pgfrm-btn pgbtn pgbtn-s3 js-login_frm-send_code" type="button">发送认证信</button>
                                      </div>
                                    </form>
                                  </div>
                                </div>
                              </div>
                            </div>
                        `;
                    }
                    // 註冊
                    else if(action == "popupSignup") {
                        html += `
                          <div class="container-inner">
                            <div class="pgpopup-hd">
                              <h1 class="pgpopup-title">快速注册</h1>
                              <div class="fast_login">
                                <ul class="cf lis-n">
                                  <li class="fast_login-item fast_login-QQ"><a class="inner" href="javascript:;" target="_blank">
                                      <div class="fast_login-logo QQ-logo"><img src="public/images/QQ-logo.png" alt="QQ"></div>
                                      <div class="txt">QQ</div></a></li>
                                  <li class="fast_login-item fast_login-wechat"><a class="inner" href="javascript:;" target="_blank">
                                      <div class="fast_login-logo wechat-logo"><img src="public/images/wechat-logo.png" alt="微信"></div>
                                      <div class="txt">微信</div></a></li>
                                </ul>
                              </div>
                            </div>
                            <div class="pgpopup-bd">
                              <div class="signup_tabs">
                                <ul class="cf lis-n">
                                  <li class="signup_tabs-item tabs_item" data-showcnt="PersonalUser">个人用户</li>
                                  <li class="signup_tabs-item tabs_item" data-showcnt="BusinessUsers">企业用户</li>
                                </ul>
                              </div>
                              <div class="signup_tabs_container tabs_container">
                                <div class="inner">
                                  <section class="tab_content" id="PersonalUser">
                                    <!-- ======================================================================================================== -->
                                    <!-- 个人用户 -->
                                    <!-- ======================================================================================================== -->
                                    <div class="signup_frm personal">
                                      <form action="" method="POST">
                                        <div class="form-group signup_frm-username">
                                          <label class="pgfrm-label" for="PU_UserName">使用者名称</label>
                                          <div class="pgfrm-field">
                                            <input class="pgfrm-input" id="PU_UserName" type="text" name="PU_UserName" placeholder="请输入全名">
                                          </div>
                                        </div>
                                        <div class="form-group signup_frm-email">
                                          <label class="pgfrm-label" for="PU_Email">Email 帳號</label>
                                          <div class="pgfrm-field input-group">
                                            <input class="pgfrm-input" id="PU_Email" type="email" name="PU_Email" placeholder="service@ai-pattern.com"><span class="signup_frm-change input-group-append to-phone">手機登入</span>
                                          </div>
                                        </div>
                                        <div class="form-group signup_frm-phone">
                                          <label class="pgfrm-label" for="PU_Phone">手机号码</label>
                                          <div class="pgfrm-field input-group">
                                            <select id="PU_nationalityCode" name="PU_nationalityCode" class="pgfrm-select nationality_code input-group-prepend">
                                              <option value="0">国籍码</option>
                                              ${buildNationalityCode(frmSetup)}
                                            </select>
                                            <input class="pgfrm-input" id="PU_Phone" type="phone" name="PU_Phone" placeholder="手机号码">
                                            <span class="signup_frm-change input-group-append to-email">信箱登入</span>
                                          </div>
                                        </div>
                                        <div class="form-group signup_frm-pw">
                                          <label class="pgfrm-label" for="PU_Password">密碼</label>
                                          <div class="pgfrm-field">
                                            <div class="is_hidden">
                                              <svg class="svg_icon icon-hidden">
                                                <use xlink:href="#hidden"></use>
                                              </svg>
                                            </div>
                                            <input class="pgfrm-input" id="PU_Password" type="password" name="PU_Password" placeholder="请输入密碼">
                                          </div>
                                        </div>
                                        <div class="form-group signup_frm-inc_code">
                                          <label class="pgfrm-label" for="PU_InvCode">邀請碼</label>
                                          <div class="pgfrm-field">
                                            <input class="pgfrm-input" id="PU_InvCode" type="text" name="PU_InvCode" placeholder="請輸入邀請碼 (可不填)">
                                          </div>
                                        </div>
                                        <div class="form-group signup_frm-btns">
                                          <button class="pgfrm-btn pgbtn pgbtn-s2 js-personal-signup_frm-submit" type="button">註冊</button>
                                        </div>
                                        <div class="form-group signup_frm-other"><a class="other-link js-to-login text-center txt-r02" href="javascript:;">已经有帐号了？去登入</a></div>
                                      </form>
                                    </div>
                                  </section>
                                  <section class="tab_content" id="BusinessUsers">
                                    <!-- ======================================================================================================== -->
                                    <!-- 企业用户 -->
                                    <!-- ======================================================================================================== -->
                                    <div class="signup_frm business">
                                      <form action="" method="POST">
                                        <div class="form-group signup_frm-country">
                                          <div class="txt">國籍</div>
                                          <select id="BU_Country" name="BU_Country" class="pgfrm-select country_select">
                                            <option value="0">请选择</option>
                                            ${buildCountry(frmSetup)}
                                          </select>
                                        </div>
                                        <div class="form-group signup_frm-BU_CompName">
                                          <label class="pgfrm-label" for="BU_CompName">公司名</label>
                                          <div class="pgfrm-field">
                                            <input class="pgfrm-input" id="BU_CompName" type="text" name="BU_CompName" placeholder="請輸入全名">
                                          </div>
                                        </div>
                                        <div class="form-group signup_frm-BU_CreditCode">
                                          <label class="pgfrm-label" for="BU_CreditCode">统一社会信用代码</label>
                                          <div class="pgfrm-field">
                                            <input class="pgfrm-input" id="BU_CreditCode" type="text" name="BU_CreditCode" placeholder="91350100M000100Y43">
                                          </div>
                                        </div>
                                        <div class="form-group signup_frm-email">
                                          <label class="pgfrm-label" for="BU_Email">Email 帳號</label>
                                          <div class="pgfrm-field input-group">
                                            <input class="pgfrm-input" id="BU_Email" type="email" name="BU_Email" placeholder="service@ai-pattern.com"><span class="signup_frm-change input-group-append to-phone">手機登入</span>
                                          </div>
                                        </div>
                                        <div class="form-group signup_frm-phone">
                                          <label class="pgfrm-label" for="BU_Phone">手机号码</label>
                                          <div class="pgfrm-field input-group">
                                            <select id="BU_nationalityCode" name="BU_nationalityCode" class="pgfrm-select nationality_code input-group-prepend">
                                              <option value="0">国籍码</option>
                                              ${buildNationalityCode(frmSetup)}
                                            </select>
                                            <input class="pgfrm-input" id="BU_Phone" type="phone" name="BU_Phone" placeholder="手机号码">
                                            <span class="signup_frm-change input-group-append to-email">信箱登入</span>
                                          </div>
                                        </div>
                                        <div class="form-group signup_frm-pw">
                                          <label class="pgfrm-label" for="BU_Password">密碼</label>
                                          <div class="pgfrm-field">
                                            <div class="is_hidden">
                                              <svg class="svg_icon icon-hidden">
                                                <use xlink:href="#hidden"></use>
                                              </svg>
                                            </div>
                                            <input class="pgfrm-input" id="BU_Password" type="password" name="BU_Password" placeholder="请输入密碼">
                                          </div>
                                        </div>
                                        <div class="form-group signup_frm-BU_InvCode">
                                          <label class="pgfrm-label" for="BU_InvCode">邀請碼</label>
                                          <div class="pgfrm-field">
                                            <input class="pgfrm-input" id="BU_InvCode" type="text" name="BU_InvCode" placeholder="請輸入邀請碼 (可不填)">
                                          </div>
                                        </div>
                                        <div class="form-group signup_frm-btns">
                                          <button class="pgfrm-btn pgbtn pgbtn-s2 js-business-signup_frm-submit" type="button">註冊</button>
                                        </div>
                                        <div class="form-group signup_frm-other"><a class="other-link js-to-login text-center txt-r02" href="javascript:;">已经有帐号了？去登入</a></div>
                                      </form>
                                    </div>
                                  </section>
                                </div>
                              </div>
                            </div>
                          </div>

                        `;
                    }

                    return html;
                }
            }
        }()),

        /**
         * >> pgElm.dialog
         */
        dialog: (function(){
          let transToClassName = (string) => {
              switch(string){
                  case "sendLink":
                      return "dialog-send_link"
                      break;
                  case "verificationCode":
                      return "dialog-verification_code"
                      break;
              }
          }
          return {
            // >>> pgElm.dialog.base(action)
            base: function(action){
              var _ = this;
              return `
                <div class="pgpopup pgdialog ${transToClassName(action)}">
                  <div class="pgpopup-bg"></div>
                  <div class="pgpopup-wrap">
                    <div class="pgpopup-container">
                      ${_.inner(action)}
                    </div>
                  </div>
                </div>
              `;
            },

            // >>> pgElm.dialog.inner(action)
            inner: function(action){
              if (action == "sendLink") {
                return `
                  <div class="container-inner">
                    <p class="pgdialog-msg">已寄送驗證連結至信箱</p>
                    <button class="pgbtn pgbtn-s2 sendToEmail-ok" type="button">OK</button>
                  </div>
                `;
              }
              else if (action == "verificationCode") {
                return `
                  <div class="container-inner">
                    <form action="">
                      <p class="pgdialog-msg">请输入验证码</p>
                      <div class="verification_code">
                        <div class="time_left">剩餘時間 <span id="countdownTime">02:31</span></div>
                        <input class="pgfrm-input pginput" type="text" placeholder="01234567">
                      </div>
                      <button class="pgbtn pgbtn-s2" type="button">確認</button>
                      <a class="other-link text-center txt-b01 sendToEmail-re" href="javascript:;">沒有收到驗證碼? 重新發送</a>
                    </form>
                  </div>
                `;
              }
            }
          }
        }())
    }
}(pgUI));
