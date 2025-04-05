export interface SearchEmailProps {
  base: string;
  id: string;
  fields: { key: string; value: string }[];
  password: string;
}

export default function NewSearchEmail(props: SearchEmailProps) {
  const { base, id, fields, password } = props;

  return (
    <html>
      <head>
        <meta name="viewport" content="width=device-width" />
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <title>All Maids PH</title>
        <style
          dangerouslySetInnerHTML={{
            __html: `
          @import url('https://fonts.cdnfonts.com/css/suez-one');

          /* -------------------------------------
              GLOBAL RESETS
          ------------------------------------- */

          .title {
            font-family: 'Suez One', sans-serif;
            font-weight: 600;
          }

          .password {
            background-color: rgba(0, 0, 0, 0.16);
            border: 1px solid rgba(0, 0, 0, 0.33);
            padding: 4px;
            border-radius: 4px;
          }

          /*All the styling goes here*/

          img {
            border: none;
            -ms-interpolation-mode: bicubic;
            max-width: 100%; 
          }

          body {
            background-color: #eaebed;
            font-family: sans-serif;
            -webkit-font-smoothing: antialiased;
            font-size: 14px;
            line-height: 1.4;
            margin: 0;
            padding: 0;
            -ms-text-size-adjust: 100%;
            -webkit-text-size-adjust: 100%; 
          }

          table {
            border-collapse: separate;
            mso-table-lspace: 0pt;
            mso-table-rspace: 0pt;
            min-width: 100%;
            width: 100%; }
            table td {
              font-family: sans-serif;
              font-size: 14px;
              vertical-align: top; 
          }

          /* -------------------------------------
              BODY & CONTAINER
          ------------------------------------- */

          .body {
            background-color: #eaebed;
            width: 100%; 
          }

          /* Set a max-width, and make it display as block so it will automatically stretch to that width, but will also shrink down on a phone or something */
          .container {
            display: block;
            Margin: 0 auto !important;
            /* makes it centered */
            max-width: 580px;
            padding: 10px;
            width: 580px; 
          }

          /* This should also be a block element, so that it will fill 100% of the .container */
          .content {
            box-sizing: border-box;
            display: block;
            Margin: 0 auto;
            max-width: 580px;
            padding: 10px; 
          }

          /* -------------------------------------
              HEADER, FOOTER, MAIN
          ------------------------------------- */
          .main {
            background: #ffffff;
            border-radius: 3px;
            width: 100%; 
          }

          .header {
            padding: 20px 0;
          }

          .wrapper {
            box-sizing: border-box;
            padding: 20px; 
          }

          .content-block {
            padding-bottom: 10px;
            padding-top: 10px;
          }

          .footer {
            clear: both;
            Margin-top: 10px;
            text-align: center;
            width: 100%; 
          }
            .footer td,
            .footer p,
            .footer span,
            .footer a {
              color: #9a9ea6;
              font-size: 12px;
              text-align: center; 
          }

          /* -------------------------------------
              TYPOGRAPHY
          ------------------------------------- */
          h1,
          h2,
          h3,
          h4 {
            color: #06090f;
            font-family: sans-serif;
            font-weight: 400;
            line-height: 1.4;
            margin: 0;
            margin-bottom: 30px; 
          }

          h1 {
            font-size: 35px;
            font-weight: 300;
            text-align: center;
            text-transform: capitalize; 
            letter-spacing: -0.05em;
          }

          p,
          ul,
          ol {
            font-family: sans-serif;
            font-size: 14px;
            font-weight: normal;
            margin: 0;
            margin-bottom: 15px; 
          }
            p li,
            ul li,
            ol li {
              list-style-position: inside;
              margin-left: 5px; 
          }

          a {
            color: #567C8F;
            text-decoration: underline; 
          }

          /* -------------------------------------
              BUTTONS
          ------------------------------------- */
          .btn {
            box-sizing: border-box;
            width: 100%; }
            .btn > tbody > tr > td {
              padding-bottom: 15px; }
            .btn table {
              min-width: auto;
              width: auto; 
          }
            .btn table td {
              background-color: #ffffff;
              border-radius: 5px;
              text-align: center; 
          }
            .btn a {
              background-color: #ffffff;
              border: solid 1px #567C8F;
              border-radius: 5px;
              box-sizing: border-box;
              color: #567C8F;
              cursor: pointer;
              display: inline-block;
              font-size: 14px;
              font-weight: bold;
              margin: 0;
              padding: 12px 25px;
              text-decoration: none;
              text-transform: capitalize; 
          }

          .btn-primary table td {
            background-color: #F65B35; 
          }

          .btn-primary a {
            background-color: #F65B35;
            border-color: #F65B35;
            color: #ffffff; 
          }

          /* -------------------------------------
              OTHER STYLES THAT MIGHT BE USEFUL
          ------------------------------------- */
          .last {
            margin-bottom: 0; 
          }

          .first {
            margin-top: 0; 
          }

          .align-center {
            text-align: center; 
          }

          .align-right {
            text-align: right; 
          }

          .align-left {
            text-align: left; 
          }

          .clear {
            clear: both; 
          }

          .mt0 {
            margin-top: 0; 
          }

          .mb0 {
            margin-bottom: 0; 
          }

          .preheader {
            color: transparent;
            display: none;
            height: 0;
            max-height: 0;
            max-width: 0;
            opacity: 0;
            overflow: hidden;
            mso-hide: all;
            visibility: hidden;
            width: 0; 
          }

          .powered-by a {
            text-decoration: none; 
          }

          hr {
            border: 0;
            border-bottom: 1px solid #f6f6f6;
            Margin: 20px 0; 
          }

          /* -------------------------------------
              RESPONSIVE AND MOBILE FRIENDLY STYLES
          ------------------------------------- */
          @media only screen and (max-width: 620px) {
            table[class=body] h1 {
              font-size: 28px !important;
              margin-bottom: 10px !important; 
            }
            table[class=body] p,
            table[class=body] ul,
            table[class=body] ol,
            table[class=body] td,
            table[class=body] span,
            table[class=body] a {
              font-size: 16px !important; 
            }
            table[class=body] .wrapper,
            table[class=body] .article {
              padding: 10px !important; 
            }
            table[class=body] .content {
              padding: 0 !important; 
            }
            table[class=body] .container {
              padding: 0 !important;
              width: 100% !important; 
            }
            table[class=body] .main {
              border-left-width: 0 !important;
              border-radius: 0 !important;
              border-right-width: 0 !important; 
            }
            table[class=body] .btn table {
              width: 100% !important; 
            }
            table[class=body] .btn a {
              width: 100% !important; 
            }
            table[class=body] .img-responsive {
              height: auto !important;
              max-width: 100% !important;
              width: auto !important; 
            }
          }

          /* -------------------------------------
              TABLE STYLING FOR FIELDS
          ------------------------------------- */
          .fields-table {
            background-color: rgba(0, 0, 0, 0.1);
            padding: 1em;
            border-radius: 0.25em;
          }

          .fields-row {
            margin-y: 4px;
          }

          .fields-rowdata {
            font-family: monospace;
          }

          .fields-row:nth-child(2) {
            text-align: right;
          }

          /* -------------------------------------
              PRESERVE THESE STYLES IN THE HEAD
          ------------------------------------- */
          @media all {
            .ExternalClass {
              width: 100%; 
            }
            .ExternalClass,
            .ExternalClass p,
            .ExternalClass span,
            .ExternalClass font,
            .ExternalClass td,
            .ExternalClass div {
              line-height: 100%; 
            }
            .apple-link a {
              color: inherit !important;
              font-family: inherit !important;
              font-size: inherit !important;
              font-weight: inherit !important;
              line-height: inherit !important;
              text-decoration: none !important; 
            }
            .btn-primary table td:hover {
              background-color: #F65B35 !important; 
            }
            .btn-primary a:hover {
              background-color: #F65B35 !important;
              border-color: #F65B35 !important; 
            } 
          }`,
          }}
        />
      </head>
      <body className="">
        <table
          role="presentation"
          border={0}
          cellPadding="0"
          cellSpacing="0"
          className="body"
        >
          <tr>
            <td>&nbsp;</td>
            <td className="container">
              <div className="header">
                <table
                  role="presentation"
                  border={0}
                  cellPadding="0"
                  cellSpacing="0"
                  width="100%"
                >
                  <tr>
                    <td className="align-center" width="100%">
                      <a href={base}>
                        <img
                          src={`${base}/favicon.ico`}
                          height="40"
                          alt="All Maids PH"
                        />
                        <h1 className="title">All Maids PH</h1>
                      </a>
                    </td>
                  </tr>
                </table>
              </div>
              <div className="content">
                <span className="preheader">
                  Thank you for using our servive!
                </span>
                <table role="presentation" className="main">
                  <tr>
                    <td className="wrapper">
                      <table
                        role="presentation"
                        className="border-none"
                        cellPadding="0"
                        cellSpacing="0"
                      >
                        <tr>
                          <td>
                            <p>
                              👋&nbsp; Thank you for using our service! Here's
                              the link to your dashboard where you can view
                              candidates.
                            </p>
                            <p>
                              ⬇️&nbsp; This link will display the link of
                              candidates we will find for you. You can access
                              this now, but we'll send you emails when we find
                              more people that fit your needs!
                            </p>
                            <p>
                              📝&nbsp; Here's a summary of the specific
                              requirements you requested for your candidates:
                            </p>
                            <table className="fields-table">
                              {fields.map((field) => (
                                <tr className="fields-row">
                                  <td className="fields-rowdata">
                                    {field.key}
                                  </td>
                                  <td className="fields-rowdata">
                                    {field.value}
                                  </td>
                                </tr>
                              ))}
                            </table>
                            <br />
                            <table
                              role="presentation"
                              className="border-none btn btn-primary"
                              cellPadding="0"
                              cellSpacing="0"
                            >
                              <tbody>
                                <tr>
                                  <td align="center">
                                    <table
                                      role="presentation"
                                      className="border-none"
                                      cellPadding="0"
                                      cellSpacing="0"
                                    >
                                      <tbody>
                                        <tr>
                                          <td>
                                            {" "}
                                            <a
                                              href={`${base}/searches/${id}/${password}`}
                                              target="_blank"
                                            >
                                              View List of Candidates
                                            </a>{" "}
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
                <div className="footer">
                  <table
                    role="presentation"
                    className="border-none "
                    cellPadding="0"
                    cellSpacing="0"
                  >
                    <tr>
                      <td className="content-block">
                        <span className="apple-link">
                          Questions? Concerns? Talk to us at <b>09270251730</b>
                        </span>
                      </td>
                    </tr>
                  </table>
                </div>
              </div>
            </td>
            <td>&nbsp;</td>
          </tr>
        </table>
      </body>
    </html>
  );
}
