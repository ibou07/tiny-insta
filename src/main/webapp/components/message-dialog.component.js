const MessageDialogComponent = {
   view: () => {
       return m("div", {class:"modal", tabindex:"-1", id:"messageDialog"},[
                   m('div', {class:"modal-dialog", role:"document"}, [
                        m("div", {class:"modal-content"}, [
                            m("div", {class:"modal-header"},[
                                 m("button", {type:"button", class:"close", "data-dismiss":"modal", "aria-label":"Close"},[
                                    m.trust('<span aria-hidden="true">&times;</span>')
                                 ])
                            ]),
                            m('div',{class:"modal-body"}, [
                                m("p", {id:"message-content"},)
                            ])
                        ])
                   ])

       ])
   }
}