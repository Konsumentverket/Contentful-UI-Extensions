import React,{useState} from 'react'
import styled from 'styled-components';

const AdditonalSearchTerms = styled.div`
    box-sizing:border-box;
    border-top: 1px solid #f1f1f1;
    position: relative;
    padding-top: 10px;
    padding-left: 25px;
    .addterm{
        
        display: flex;
        align-items: center;
        margin-bottom: 15px;
    }

    .add{
        background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAEDWlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNC4yLjItYzA2MyA1My4zNTI2MjQsIDIwMDgvMDcvMzAtMTg6MTI6MTggICAgICAgICI+CiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogIDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiCiAgICB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iCiAgICB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIKICAgIHhtbG5zOnN0RXZ0PSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VFdmVudCMiCiAgIHhtcDpMYWJlbD0iQXBwcm92ZWQiCiAgIHhtcDpNZXRhZGF0YURhdGU9IjIwMDktMTEtMjNUMTM6NDM6MTcrMDE6MDAiCiAgIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NzRFMjBDNzYyQUQ4REUxMUJEMzE4NkU4MzAyOTlCQ0QiCiAgIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NzRFMjBDNzYyQUQ4REUxMUJEMzE4NkU4MzAyOTlCQ0QiCiAgIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo3NEUyMEM3NjJBRDhERTExQkQzMTg2RTgzMDI5OUJDRCI+CiAgIDx4bXBNTTpIaXN0b3J5PgogICAgPHJkZjpTZXE+CiAgICAgPHJkZjpsaQogICAgICBzdEV2dDphY3Rpb249InNhdmVkIgogICAgICBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOjc0RTIwQzc2MkFEOERFMTFCRDMxODZFODMwMjk5QkNEIgogICAgICBzdEV2dDp3aGVuPSIyMDA5LTExLTIzVDEzOjQzOjE3KzAxOjAwIgogICAgICBzdEV2dDpjaGFuZ2VkPSIvbWV0YWRhdGEiLz4KICAgIDwvcmRmOlNlcT4KICAgPC94bXBNTTpIaXN0b3J5PgogIDwvcmRmOkRlc2NyaXB0aW9uPgogPC9yZGY6UkRGPgo8L3g6eG1wbWV0YT4KPD94cGFja2V0IGVuZD0iciI/PoBltnoAAAAqdEVYdENyZWF0aW9uIFRpbWUATWkgMSBPa3QgMjAwMyAwMDowOToxNCArMDEwMNeYJLkAAAAHdElNRQfTCR4WCTbje3fuAAAACXBIWXMAAAsSAAALEgHS3X78AAAABGdBTUEAALGPC/xhBQAAAb5JREFUeNqlkr9PFFEQx79vQYLkUEmMFRYUdDZcx79AYeV/ocYEGm1sbLAzsRU7S6MxJDTaG4ur7CxMrrgELrfAcd7+eDNvmJmFQMxqSHibzdud3fnOZ75vgGuu0Ba8926hd39peU2SIKWExAn94eD70bNq/e9/Z9sEJAU833iMCeWoucDgsI83nz+1ErQLiICFMI77qGiKkyr3WNvK2gkUXZKLpESeLNzugRPc3bnZg2JbIpKqSrYiJsAEUoGgTmVZWF18PdczocYbQfGSum5i9+OqvNh40lTUREue0jGG5W9EqlHFAp0bS5gLHdRUYFr/wfsvXzHYOg5OYGoTGmnPBy5ilWOqQBRBHMFKkU/3NT7QmxGjkhFftCB6VDWXbpj1bNic2JMjV81R6rvt5ocV9HbPBSyQTw4wrkaNYXrNzAYnsSSrWBTRn43AqieWi0G683b+Z5DGHG1fg2F589HD2+My98rjkxIf9n6MFKxv3+WMgLal6wRHT8sHl4+mo27PZ7fWDnl4VlXvKL/qV+lqk2gt1VQ6rvfs+3/moG0SCz0q693ESAnOTbsagRq0s/sNrGb50LBN4j8QrrtOAZsPYM28PXKaAAAAAElFTkSuQmCC");
        background-repeat: no-repeat;
        padding-left: 20px;
        margin-left: 10px;
        color: #1a4aa4;
        

    }

    .tag{
        border-radius: 5px;
        float: left;
        color: #fff;
        padding: 4px 4px 4px 4px;
        margin-right: 10px;
        background-color: #3b83bd
        a{
            background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAFf2lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNC4yLjItYzA2MyA1My4zNTI2MjQsIDIwMDgvMDcvMzAtMTg6MTI6MTggICAgICAgICI+CiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogIDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiCiAgICB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iCiAgICB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIKICAgIHhtbG5zOnN0RXZ0PSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VFdmVudCMiCiAgIHhtcDpNZXRhZGF0YURhdGU9IjIwMDktMTEtMjNUMTQ6MTY6MTcrMDE6MDAiCiAgIHhtcDpMYWJlbD0iQXBwcm92ZWQiCiAgIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MjgwNUJBQjczMUQ4REUxMUJEMzE4NkU4MzAyOTlCQ0QiCiAgIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NzJFMjBDNzYyQUQ4REUxMUJEMzE4NkU4MzAyOTlCQ0QiCiAgIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo3MkUyMEM3NjJBRDhERTExQkQzMTg2RTgzMDI5OUJDRCI+CiAgIDx4bXBNTTpIaXN0b3J5PgogICAgPHJkZjpTZXE+CiAgICAgPHJkZjpsaQogICAgICBzdEV2dDphY3Rpb249InNhdmVkIgogICAgICBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOjcyRTIwQzc2MkFEOERFMTFCRDMxODZFODMwMjk5QkNEIgogICAgICBzdEV2dDp3aGVuPSIyMDA5LTExLTIzVDEzOjQyOjM3KzAxOjAwIgogICAgICBzdEV2dDpjaGFuZ2VkPSIvbWV0YWRhdGEiLz4KICAgICA8cmRmOmxpCiAgICAgIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiCiAgICAgIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6OTYxRUUxQjMzMUQ4REUxMUJEMzE4NkU4MzAyOTlCQ0QiCiAgICAgIHN0RXZ0OndoZW49IjIwMDktMTEtMjNUMTQ6MTE6MjYrMDE6MDAiCiAgICAgIHN0RXZ0OmNoYW5nZWQ9Ii9tZXRhZGF0YSIvPgogICAgIDxyZGY6bGkKICAgICAgc3RFdnQ6YWN0aW9uPSJzYXZlZCIKICAgICAgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDoyODA1QkFCNzMxRDhERTExQkQzMTg2RTgzMDI5OUJDRCIKICAgICAgc3RFdnQ6d2hlbj0iMjAwOS0xMS0yM1QxNDoxNjoxNyswMTowMCIKICAgICAgc3RFdnQ6Y2hhbmdlZD0iL21ldGFkYXRhIi8+CiAgICA8L3JkZjpTZXE+CiAgIDwveG1wTU06SGlzdG9yeT4KICA8L3JkZjpEZXNjcmlwdGlvbj4KIDwvcmRmOlJERj4KPC94OnhtcG1ldGE+Cjw/eHBhY2tldCBlbmQ9InIiPz4giZiqAAAAK3RFWHRDcmVhdGlvbiBUaW1lAERpIDMwIFNlcCAyMDAzIDIzOjU0OjI2ICswMTAwZdX/wQAAAAd0SU1FB9MJHhU2OF5bzowAAAAJcEhZcwAACxIAAAsSAdLdfvwAAAAEZ0FNQQAAsY8L/GEFAAACcElEQVR42q1TXUgUURg94/7goutC/iRoGT1YZphZoIRhBBUZsRRBVr5V0EM9RfTSU9BLiNRLRA9FJPQgBD2IhtpKFga57mq20CL+sGsotauz4+7O3Jl7b98uuaztq/Mw9873fefMOWfuANt9BYD2MaBvCmj+v/cZuD6kYGQAOHsfKCoAzwNPoxePCfPhZRlUlE/5vUngTKi+gsmr9TLS5JFDNiWQqW9hkbXl3prOZsXuBHaeOnDcD3Rn6rS2yBpPf0NHrQNpA6zEAYNLfwFBPBrrNxdXAMNAdeseWOUlvcPASVZZNnjU2+CGugHNMBGaikftwN0CgjLg9dLYrISkB53hsLexsrjCPdLW1VQFNQHBLcx8V4XbEDfOAWoBwT5gNjYxNw7LBEwLDpcD7V0HFag0y02EIxoSkeSzE8CHTUxBkmkuehbHwwRgWStIJImM4Xc8hR/fYkENuJc/v4WAkq5NA3eKPS4CkQrGsuDsPm3CklgjgC0fo2yuX4Gb2LXj8ZHzjR4714EUUVnWPxIikBzxdR2+L/HJMgHvaeBXjuAjcKGute7d3rYaYC1BQE4WONlmsFFwwqR9piYFdN2Ez6+tpFOiuwsYzVpYp0SFSX7/xCl9Pes9sZHEwPCyNb+k0Vs4YTkJsmBXJDpaiqtJ34NcBg6b0ru7rpR8prPgVTUJ39hqTGpmRyCoPl+IUl0ISFLBSNnkPAOdtZcZrD1zS3E5yrWNQ4ZLQZiGf06r0yVCXuoE5qg98X5Gs9h+1+0Mam6ZwYjxJ9eAN7kM+oCKUmfRoLArVXqKv6AUem6Rlvy03wKP6BM63cCrK0Bo2/7ev40+Kr/ztfp4AAAAAElFTkSuQmCC");
            background-repeat: no-repeat;
            width: 17px;
            height: 17px;
            display: inline-block;
            vertical-align: middle;
            margin-left: 4px;
        }
    }

`;

const Wrapper = styled.div`
    background-color: #fff;
    
    overflow: hidden;
    position: relative;
    padding: 10px;
    h2{
        margin-left: 20px;
        margin-bottom: 10px;
    }
`;

const PropList = styled.ul`
    overflow: hidden;    
    box-sizing:border-box;
    list-style: none;
    padding-left: 25px;
    li{
        float: left;
        width:50%;

        span{
            font-weight: bold;
        }

    }

`;

const CustomName = styled.div`
    padding-left: 25px;
    display: flex;

    * {
        margin-right: 10px;
    }

    a:before{
        vertical-align: bottom;
        content:"";
        display:inline-block;
        width: 16px;
        height: 16px;
        background-size: 16px;
        background-repeat: no-repeat;
        background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjwhRE9DVFlQRSBzdmcgIFBVQkxJQyAnLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4nICAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkJz48c3ZnIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDM1Ljk5OSAzNi4wMDU7IiB2ZXJzaW9uPSIxLjEiIHZpZXdCb3g9IjAgMCAzNS45OTkgMzYuMDA1IiB4bWw6c3BhY2U9InByZXNlcnZlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj48ZyBpZD0iU2F2ZV9Eb2MiPjxnIGlkPSJMYXllcl8xOCI+PGcgaWQ9IkNsaXBWaWV3XzE1Ij48cGF0aCBkPSJNMCwwdjM2LjAwNWgzNS45OTlWMEgweiIgbWFya2VyLWVuZD0ibm9uZSIgbWFya2VyLXN0YXJ0PSJub25lIiBzdHlsZT0iZmlsbDpub25lOyIvPjxnPjxkZWZzPjxyZWN0IGhlaWdodD0iMzYuMDA1IiBpZD0iU1ZHSURfMV8iIHdpZHRoPSIzNS45OTkiLz48L2RlZnM+PGNsaXBQYXRoIGlkPSJTVkdJRF8yXyI+PHVzZSBzdHlsZT0ib3ZlcmZsb3c6dmlzaWJsZTsiIHhsaW5rOmhyZWY9IiNTVkdJRF8xXyIvPjwvY2xpcFBhdGg+PGcgc3R5bGU9ImNsaXAtcGF0aDp1cmwoI1NWR0lEXzJfKTsiPjxnIGlkPSJHcm91cF8zOSI+PHBhdGggZD0iTTYuMjE3LDMyLjAzNGwtMi4yNDktMi4yNSAgICAgICAgYy0wLjE0MS0wLjE0MS0wLjIxOS0wLjMzMi0wLjIxOS0wLjUzMVY0LjVjMC0wLjQxMywwLjMzNi0wLjc1LDAuNzUtMC43NWgyNy4wMDNjMC40MTMsMCwwLjc1LDAuMzM3LDAuNzUsMC43NXYyNy4wMDMgICAgICAgIGMwLDAuNDE0LTAuMzM3LDAuNzUtMC43NSwwLjc1SDYuNzQ4QzYuNTQ5LDMyLjI1Myw2LjM1OCwzMi4xNzQsNi4yMTcsMzIuMDM0eiIgbWFya2VyLWVuZD0ibm9uZSIgbWFya2VyLXN0YXJ0PSJub25lIiBzdHlsZT0iZmlsbDojMjA1REFGOyIvPjxsaW5lYXJHcmFkaWVudCBncmFkaWVudFRyYW5zZm9ybT0ibWF0cml4KDEgMCAwIDEgMTcwLjI1MiAxNjMuOTYyKSIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiIGlkPSJTVkdJRF8zXyIgeDE9Ii0xNTIuMjUxNSIgeDI9Ii0xNTIuMjUxNSIgeTE9Ii0xNjEuNzA5IiB5Mj0iLTEzNS44MzQiPjxzdG9wIG9mZnNldD0iMCIgc3R5bGU9InN0b3AtY29sb3I6IzczQUVGRiIvPjxzdG9wIG9mZnNldD0iMSIgc3R5bGU9InN0b3AtY29sb3I6IzQ3OERFQyIvPjwvbGluZWFyR3JhZGllbnQ+PHBhdGggZD0iTTQuNDk5LDQuNXYyNC43NTNsMi4yNDksMi4yNWgyNC43NTRWNC41SDQuNDk5eiAgICAgICAgIiBtYXJrZXItZW5kPSJub25lIiBtYXJrZXItc3RhcnQ9Im5vbmUiIHN0eWxlPSJmaWxsOnVybCgjU1ZHSURfM18pOyIvPjwvZz48bGluZWFyR3JhZGllbnQgZ3JhZGllbnRUcmFuc2Zvcm09Im1hdHJpeCg2LjEyMzIzNGUtMDE3IC0xIDEgNi4xMjMyMzRlLTAxNyAxMjEuMDAyIDIxOS4zNjYpIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgaWQ9IlNWR0lEXzRfIiB4MT0iMTk4LjcwOSIgeDI9IjIxMi41NTYiIHkxPSItMTAzLjAwMyIgeTI9Ii0xMDMuMDAzIj48c3RvcCBvZmZzZXQ9IjAiIHN0eWxlPSJzdG9wLWNvbG9yOiNENkU2RjYiLz48c3RvcCBvZmZzZXQ9IjEiIHN0eWxlPSJzdG9wLWNvbG9yOiNGRkZGRkYiLz48L2xpbmVhckdyYWRpZW50PjxwYXRoIGQ9Ik04LjI0OCw0LjUwNGwwLjAwMywxMy44NDQgICAgICAgYzAsMC41NDIsMC41NzQsMS4xNTQsMS4wODIsMS4xNTRoMTcuMzMzYzAuNTA5LDAsMS4wODMtMC42MTIsMS4wODMtMS4xNTRMMjcuNzUsNC41MDRIOC4yNDh6IiBtYXJrZXItZW5kPSJub25lIiBtYXJrZXItc3RhcnQ9Im5vbmUiIHN0eWxlPSJmaWxsOnVybCgjU1ZHSURfNF8pOyIvPjxwYXRoIGQ9Ik0xMS4yNSwzMS41MDJWMjMuNjJjMC0wLjQ4NiwwLjQzMy0xLjEyLDAuODk5LTEuMTIgICAgICAgbDEzLjAzMS0wLjAwMWMwLjUwMSwwLDEuMDcsMC41OTMsMS4wNywxLjEyMXY3Ljg4MkgxMS4yNXogTTE3LjI1LDMwLjc0OXYtNmgtM3Y2SDE3LjI1eiIgbWFya2VyLWVuZD0ibm9uZSIgbWFya2VyLXN0YXJ0PSJub25lIiBzdHlsZT0iZmlsbDojMjA1REFGOyIvPjxsaW5lYXJHcmFkaWVudCBncmFkaWVudFRyYW5zZm9ybT0ibWF0cml4KDAuNzI2NyAwLjY4NyAtMC42NTE2IDAuNzYwMSAxODkuNzE4IDE5OC44NDI5KSIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiIGlkPSJTVkdJRF81XyIgeDE9Ii0yNDcuOTU3MyIgeDI9Ii0yMzMuMjEzMyIgeTE9Ii02LjY2MjkiIHkyPSItNi42NjI5Ij48c3RvcCBvZmZzZXQ9IjAiIHN0eWxlPSJzdG9wLWNvbG9yOiNGRkZGRkYiLz48c3RvcCBvZmZzZXQ9IjAuNDUxIiBzdHlsZT0ic3RvcC1jb2xvcjojQkVDNkQxIi8+PHN0b3Agb2Zmc2V0PSIxIiBzdHlsZT0ic3RvcC1jb2xvcjojRkZGRkZGIi8+PC9saW5lYXJHcmFkaWVudD48cGF0aCBkPSJNMTAuNSwzMS41MDV2LTcuODgyICAgICAgIGMwLTAuNDg2LDAuNDMzLTEuMTIsMC44OTktMS4xMmwxMy4wMzEtMC4wMDFjMC41MDEsMCwxLjA3LDAuNTkzLDEuMDcsMS4xMjF2Ny44ODJIMTAuNXogTTE2LjUsMzAuNzUydi02aC0zdjZIMTYuNXoiIG1hcmtlci1lbmQ9Im5vbmUiIG1hcmtlci1zdGFydD0ibm9uZSIgc3R5bGU9ImZpbGw6dXJsKCNTVkdJRF81Xyk7Ii8+PGxpbmVhckdyYWRpZW50IGdyYWRpZW50VHJhbnNmb3JtPSJtYXRyaXgoMC43NDAxIDAuNjcyNSAtMC42NDQ4IDAuNzY1MyAxODUuMTE2NSAxNzEuNTU4OCkiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIiBpZD0iU1ZHSURfNl8iIHgxPSItMjQ3LjMxNzMiIHgyPSItMjIzLjg5NzMiIHkxPSItMTAuNDEyMyIgeTI9Ii0xMC40MTIzIj48c3RvcCBvZmZzZXQ9IjAiIHN0eWxlPSJzdG9wLWNvbG9yOiM0NzhERUMiLz48c3RvcCBvZmZzZXQ9IjEiIHN0eWxlPSJzdG9wLWNvbG9yOiMyMDVEQUYiLz48L2xpbmVhckdyYWRpZW50PjxwYXRoIGQ9Ik04LjI1LDQuNTAxdjIuMjUxaDE5LjUwMVY0LjUwMUg4LjI1eiIgbWFya2VyLWVuZD0ibm9uZSIgbWFya2VyLXN0YXJ0PSJub25lIiBzdHlsZT0iZmlsbDp1cmwoI1NWR0lEXzZfKTsiLz48cGF0aCBkPSJNNS4yNDksNS4yNTJ2MS40OTZoMS41VjUuMjUySDUuMjQ5eiIgbWFya2VyLWVuZD0ibm9uZSIgbWFya2VyLXN0YXJ0PSJub25lIiBzdHlsZT0iZmlsbDojMEMzNjcwOyIvPjxwYXRoIGQ9Ik0yOS4yNSw1LjI1NnYxLjQ5NmgxLjVWNS4yNTZIMjkuMjV6IiBtYXJrZXItZW5kPSJub25lIiBtYXJrZXItc3RhcnQ9Im5vbmUiIHN0eWxlPSJmaWxsOiMwQzM2NzA7Ii8+PHBhdGggZD0iTTQuNDk3LDQuNTA0djI0Ljc0OWwwLjc1MywwLjc0OSAgICAgICBWNC41MDRINC40OTd6IiBtYXJrZXItZW5kPSJub25lIiBtYXJrZXItc3RhcnQ9Im5vbmUiIHN0eWxlPSJmaWxsOiM3M0FFRkY7ZmlsbC1vcGFjaXR5OjAuNDM1MzsiLz48cGF0aCBkPSJNMTAuNDk4LDMxLjUwMnYwLjc1MWgxNS4wMDF2LTAuNzUxSDEwLjQ5OHoiIG1hcmtlci1lbmQ9Im5vbmUiIG1hcmtlci1zdGFydD0ibm9uZSIgc3R5bGU9ImZpbGw6IzZGODE5OTsiLz48cGF0aCBkPSJNNS4yNSw2Ljc1M3YwLjc0OWgxLjQ5OVY2Ljc1M0g1LjI1ICAgICAgIHoiIG1hcmtlci1lbmQ9Im5vbmUiIG1hcmtlci1zdGFydD0ibm9uZSIgc3R5bGU9ImZpbGw6I0RERUJGRTtmaWxsLW9wYWNpdHk6MC4yMjc1OyIvPjxwYXRoIGQ9Ik0yOS4yNTEsNi43NTN2MC43NDloMS40OTlWNi43NTMgICAgICAgSDI5LjI1MXoiIG1hcmtlci1lbmQ9Im5vbmUiIG1hcmtlci1zdGFydD0ibm9uZSIgc3R5bGU9ImZpbGw6I0RERUJGRTtmaWxsLW9wYWNpdHk6MC4yMjc1OyIvPjwvZz48L2c+PC9nPjwvZz48L2c+PGcgaWQ9IkxheWVyXzEiLz48L3N2Zz4=);
    }


`


export default (props) => {


    const [newTerm, setNewTerm] = useState("");
    const [newCustomName, setNewCustomName] = useState(props.airportToEdit.customName);

    const addSearchTerm = () => {
        if (newTerm === null || newTerm == "") return;
        props.addSearchTermToAirport(newTerm);
    }

    const saveCustomName = () => {
        if(newCustomName === null || newCustomName == "") return;
        props.saveCustomName(newCustomName);
    }
    

    if (props.airportToEdit === null)
        return null;

    var keysToIgnore = ["id","additionalTerms"];

    var keyVal = [];
    for (var name in props.airportToEdit) {
        if (keysToIgnore.indexOf(name) !== -1) continue;
        keyVal.push(<li key={name}><span>{name}:</span> {props.airportToEdit[name]}</li>);
    }
    
    if(!props.airportToEdit.hasOwnProperty('additionalTerms')){
        props.airportToEdit.additionalTerms = [];
    }

    return (
        <Wrapper>
            <h2>{props.airportToEdit.name}</h2>
            <CustomName>
                <input placeholder="Custom name for airport" type="text" value={newCustomName} id="customName" onChange={(e) => setNewCustomName(e.target.value)} />
                <a onClick={saveCustomName}>Spara</a>
            </CustomName>
            <PropList>
                {keyVal}     
            </PropList>
            <AdditonalSearchTerms>
            <div className="addterm">
                    <input className="input" type="text" value={newTerm} onChange={(e) => {setNewTerm(e.target.value)}} />
                    <a className="add" onClick={addSearchTerm}>Lägg till sökterm</a>
                </div>
                {props.airportToEdit.additionalTerms.map(function (term) {
                    return <div key={term} className="tag">{term}<a onClick={() => props.removeSearchFromAirportTerm(term)} /></div>;
                })}

                
            </AdditonalSearchTerms>
        </Wrapper>);

}



