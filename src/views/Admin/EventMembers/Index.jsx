import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as XLSX from 'xlsx';
import Api from '../../../services/Api';
import Cookies from 'js-cookie';
import LayoutAdmin from '../../../layouts/Admin';
import hasAnyPermission from '../../../utils/Permissions';
import Pagination from '../../../components/general/Pagination';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import moneyFormat from '../../../utils/MoneyFormat';
import toast from 'react-hot-toast';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';

export default function EventMembersIndex() {
    document.title = "Event Members";
    const [members, setMembers] = useState([]);
    const [pagination, setPagination] = useState({
        currentPage: 0,
        perPage: 0,
        total: 0,
    });
    const [keywords, setKeywords] = useState("");
    const token = Cookies.get("token");

    const fetchData = async (pageNumber = 1, keywords = "") => {
        const page = pageNumber ? pageNumber : pagination.currentPage;
        await Api.get(`/api/admin/event-members?search=${keywords}&page=${page}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then((response) => {
            setMembers(response.data.data.data);
            setPagination({
                currentPage: response.data.data.current_page,
                perPage: response.data.data.per_page,
                total: response.data.data.total,
            });
        });
    };

    useEffect(() => {
        fetchData();
    }, []);

    const searchData = async (e) => {
        setKeywords(e.target.value);
        fetchData(1, e.target.value);
    };

    const deleteMember = (id) => {
        confirmAlert({
            title: "Are You Sure?",
            message: "Want to delete this data?",
            buttons: [
                {
                    label: "YES",
                    onClick: async () => {
                        await Api.delete(`/api/admin/event-members/${id}`, {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        }).then((response) => {
                            toast.success(response.data.message, {
                                position: "top-right",
                                duration: 4000,
                            });
                            fetchData();
                        });
                    },
                },
                {
                    label: "NO",
                    onClick: () => { },
                },
            ],
        });
    };

    const deleteAllPending = () => {
        confirmAlert({
            title: "Are You Sure?",
            message: "ini akan menghapus semua data member yang status PENDING",
            buttons: [
                {
                    label: "YES",
                    onClick: async () => {
                        await Api.get(`/api/admin/event-members_delete_all_pending`, {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        }).then((response) => {
                            toast.success(response.data.message, {
                                position: "top-right",
                                duration: 4000,
                            });
                            fetchData();
                        });
                    },
                },
                {
                    label: "NO",
                    onClick: () => { },
                },
            ],
        });
    };

    const deleteAllPendingTimesUp = () => {
        confirmAlert({
            title: "Are You Sure?",
            message: "ini akan menghapus semua data member status PENDING yang waktunya habis ",
            buttons: [
                {
                    label: "YES",
                    onClick: async () => {
                        await Api.get(`/api/admin/event-members_delete_all_pending_times_up`, {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        }).then((response) => {
                            toast.success(response.data.message, {
                                position: "top-right",
                                duration: 4000,
                            });
                            fetchData();
                        });
                    },
                },
                {
                    label: "NO",
                    onClick: () => { },
                },
            ],
        });
    };

    const remainderAllPendings = () => {
        confirmAlert({
            title: "Are You Sure?",
            message: "ini akan mengirim Remainder semua data member status PENDING ",
            buttons: [
                {
                    label: "YES",
                    onClick: async () => {
                        await Api.get(`/api/admin/event-members_remainder_all_pending`, {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        }).then((response) => {
                            toast.success(response.data.message, {
                                position: "top-right",
                                duration: 4000,
                            });
                            fetchData();
                        });
                    },
                },
                {
                    label: "NO",
                    onClick: () => { },
                },
            ],
        });
    };

    const remainderAllPaids = () => {
        confirmAlert({
            title: "Are You Sure?",
            message: "ini akan mengirim Remainder/Konfirmasi Pembayaran semua data member status PAID ",
            buttons: [
                {
                    label: "YES",
                    onClick: async () => {
                        await Api.get(`/api/admin/event-members_remainder_all_paid`, {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        }).then((response) => {
                            toast.success(response.data.message, {
                                position: "top-right",
                                duration: 4000,
                            });
                            fetchData();
                        });
                    },
                },
                {
                    label: "NO",
                    onClick: () => { },
                },
            ],
        });
    };

    const generateNumber = () => {
        confirmAlert({
            title: "Are You Sure?",
            message: "ini akan mengenerate nomor bib member",
            buttons: [
                {
                    label: "YES",
                    onClick: async () => {
                        await Api.get(`/api/admin/event-members_number`, {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        }).then((response) => {
                            toast.success(response.data.message, {
                                position: "top-right",
                                duration: 4000,
                            });
                            fetchData();
                        });
                    },
                },
                {
                    label: "NO",
                    onClick: () => { },
                },
            ],
        });
    };

    const remainderPaids = (id) => {
        confirmAlert({
            title: "Are You Sure?",
            message: `ini akan mengirim Remainder/Konfirmasi Pembayaran ke email Member ${id}`,
            buttons: [
                {
                    label: "YES",
                    onClick: async () => {
                        await Api.get(`/api/admin/event-members_paid/${id}`, {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        }).then((response) => {
                            toast.success(response.data.message, {
                                position: "top-right",
                                duration: 4000,
                            });
                            fetchData();
                        });
                    },
                },
                {
                    label: "NO",
                    onClick: () => { },
                },
            ],
        });
    };


    const regMember = (id) => {
        confirmAlert({
            title: "Registrasi Ulang",
            message: "Lakukan Registrasi Ulang dan Pengambilan Godybag",
            buttons: [
                {
                    label: "YES",
                    onClick: async () => {
                        await Api.get(`/api/admin/event-members_re_reg/${id}`, {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        }).then((response) => {
                            toast.success(response.data.message, {
                                position: "top-right",
                                duration: 4000,
                            });
                            fetchData();
                        });
                    },
                },
                {
                    label: "NO",
                    onClick: () => { },
                },
            ],
        });
    };



    function formatPhoneNumber(phoneNumber) {
        // Jika nomor dimulai dengan '0', ganti dengan '62'
        if (phoneNumber.startsWith('0')) {
            return '62' + phoneNumber.slice(1);
        }
        return phoneNumber;
    }

    const calculateTimeLeft = (createdAt) => {
        const now = new Date();
        const endTime = new Date(createdAt);
        endTime.setHours(endTime.getHours() + 24);
        const timeLeft = endTime - now;

        if (timeLeft <= 0) {
            return "Waktu Habis";
        }

        const hours = Math.floor(timeLeft / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

        return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    };

    const [timers, setTimers] = useState({});

    useEffect(() => {
        const intervals = members.map(member => {
            return setInterval(() => {
                setTimers(timers => ({
                    ...timers,
                    [member.id]: calculateTimeLeft(member.created_at),
                }));
            }, 1000);
        });

        return () => intervals.forEach(clearInterval);
    }, [members]);

    return (
        <LayoutAdmin>
            <main>
                <div className="container-fluid mb-5 mt-5">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="row">
                                {hasAnyPermission(["event_members.create"]) && (
                                    <div className="col-md-3 col-12 mb-2">
                                        <Link
                                            to="/admin/event-members/create"
                                            className="btn btn-md btn-primary border-0 shadow-sm w-100"
                                            type="button"
                                        >
                                            <i className="fa fa-plus-circle"></i> Add New
                                        </Link>
                                    </div>
                                )}
                                <div className="col-md-3 col-12 mb-2">
                                    <button onClick={fetchData} className='btn btn-md btn-primary border-0 shadow-sm w-100'>
                                        <i className='fa fa-refresh'></i> Reload 
                                    </button>
                                </div>
                                <div className="col-md-3 col-12 mb-2">
                                    <a className='btn btn-md btn-info border-0 shadow-sm w-100' href={`https://dev.otban5-events.com/api/public/event-members-export`} target='_blank'>
                                        <i className='fa fa-download'></i> Export Excel
                                    </a>
                                </div>
                                <div className="col-md-3 col-12 mb-2">
                                    <Dropdown>
                                        <Dropdown.Toggle variant="danger" className="btn btn-info border-0 shadow-sm w-100">
                                            <i className="fa fa-trash"></i> Delete
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                            <Dropdown.Item onClick={deleteAllPendingTimesUp}>Hapus Semua PENDING yang waktunya habis</Dropdown.Item>
                                            <Dropdown.Item onClick={deleteAllPending}>Hapus Semua Member PENDING</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </div>
                                <div className="col-md-3 col-12 mb-2">
                                    <Dropdown>
                                        <Dropdown.Toggle variant="warning" className="btn btn-info border-0 shadow-sm w-100">
                                            <i className="fa fa-envelope"></i> Remainder
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                            <Dropdown.Item onClick={remainderAllPendings}>Remainder Semua Member PENDING</Dropdown.Item>
                                            <Dropdown.Item onClick={remainderAllPaids}>Konfirmasi Semua Member PAID</Dropdown.Item>
                                            <Dropdown.Item onClick={generateNumber}>Generare Number</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </div>
                                <div className="col-md-3 col-12 mb-2">
                                    <div className="input-group border-0 shadow-sm">
                                        <input
                                            type="text"
                                            className="form-control border-0 shadow-sm"
                                            onChange={(e) => searchData(e)}
                                            placeholder="Search here..."
                                        />
                                        <span className="input-group-text border-0 shadow-sm">
                                            <i className="fa fa-search"></i>
                                        </span>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className="row mt-1">
                        <div className="col-md-12">
                            <div className='alert alert-info'>
                                <ul>
                                    <li>Nomor WA member bisa diklik untuk mengirim Reminder pembayaran status PENDING dan Konfirmasi bayar status PAID melalui WA WEB atau WA App</li>
                                    <li>Eksport Excel mengunduh semua member dengan mengurutkan member PENDING lalu nomor BIB dari 0001 dst. </li>
                                </ul>
                            </div>
                            <div className="card border-0 rounded shadow-sm border-top-success">
                                <div className="card-body">
                                    <div className="table-responsive">
                                        <table className="table table-bordered table-centered mb-0 rounded">
                                            <thead className="thead-dark">
                                                <tr className="border-0">
                                                    <th className="border-0" style={{ width: "5%" }}>
                                                        No.
                                                    </th>
                                                    <th className="border-0">Tgl</th>
                                                    <th className="border-0">Invoice</th>
                                                    <th className="border-0">Full Name</th>
                                                    <th className="border-0">Payment</th>
                                                    <th className="border-0">Events</th>
                                                    <th className="border-0">Jersey</th>
                                                    <th className="border-0" style={{ width: '15%' }}>Name BIB</th>
                                                    <th className="border-0" >Status</th>
                                                    {/* <th className="border-0">Timer</th> */}
                                                    <th className="border-0" style={{ width: '15%' }}>
                                                        Actions
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {members.length > 0 ? (
                                                    members.map((member, index) => {
                                                        const formattedPhoneNumber = formatPhoneNumber(member.no_whatsapp);
                                                        const messagePending = `Halo ${member.first_name},\nBerikut adalah remainder pembayaran Event Anda:\n\n${`https://otban5-events.com/regis-confirm?invoice=${member.invoice}`}`;
                                                        const messagePaid = `Halo ${member.first_name},\n\nKami dengan senang hati menginformasikan bahwa pembayaran Anda telah diterima. Berikut adalah informasi pendaftaran Anda::\n\n${`https://api.otban5-events.com/api/public/event-members-pdf/${member.invoice}`}`;
                                                        return (
                                                            <tr
                                                                key={index}
                                                                className={
                                                                    member.status === 'CEK'
                                                                        ? 'bg-danger bg-opacity-50'
                                                                        : member.status === 'PAID'
                                                                            ? 'bg-warning bg-opacity-50'
                                                                            : member.status === 'PAID-REG'
                                                                                ? 'bg-success bg-opacity-50'
                                                                                : ''
                                                                }
                                                            >
                                                                <td className="fw-bold text-center">
                                                                    {index + 1 + (pagination.currentPage - 1) * pagination.perPage}
                                                                </td>
                                                                <td>{new Date(member.created_at).toLocaleDateString('en-GB')}</td>
                                                                <td>{member.invoice}</td>
                                                                <td>
                                                                    {member.first_name} <hr />
                                                                    NIK: {member.nik} <br />
                                                                    email: {member.email} <br />
                                                                    {member.status === 'PENDING' && (
                                                                        <a
                                                                            href={`https://wa.me/${formattedPhoneNumber}?text=${encodeURIComponent(messagePending)}`}
                                                                            target="_blank"
                                                                            rel="noopener noreferrer"
                                                                        >
                                                                            WA: {formattedPhoneNumber}
                                                                        </a>
                                                                    )}
                                                                    {member.status === 'PAID' && (
                                                                        <a className='text-info'
                                                                            href={`https://wa.me/${formattedPhoneNumber}?text=${encodeURIComponent(messagePaid)}`}
                                                                            target="_blank"
                                                                            rel="noopener noreferrer"
                                                                        >
                                                                            WA: {formattedPhoneNumber}
                                                                        </a>
                                                                    )}


                                                                </td>
                                                                <td>{moneyFormat(member.payment)}</td>
                                                                <td>{member.event.title} / {member.event_category.name}</td>
                                                                <td>{member.event_jersey.size}</td>
                                                                <td>
                                                                    {member.name_bib}
                                                                    {(member.status === 'PAID' || member.status === 'PAID-REG') && (
                                                                        <>
                                                                            <hr />
                                                                            Nomor: {member.no_member}
                                                                        </>
                                                                    )}
                                                                    {member.status === 'PAID-REG' && (
                                                                        <p className='text-info'>
                                                                            <hr />
                                                                            Rereg: {member.re_register} <br />
                                                                            Kontak: {member.re_hp_register} <br />
                                                                            Tgl: {new Date(member.updated_at).toLocaleDateString('en-GB')} <br />
                                                                            Jam : {new Date(member.updated_at).toLocaleTimeString('en-GB')}
                                                                        </p>
                                                                    )}

                                                                </td>
                                                                <td className='text-center'>
                                                                    {member.status}
                                                                    {member.status === 'PAID' && (
                                                                        <>
                                                                            <hr />
                                                                            <a className='btn btn-dark btn-sm' href={`https://api.otban5-events.com/api/public/event-members-pdf/${member.invoice}`} target='_blank'>
                                                                                <i className='fa fa-download'></i>
                                                                            </a>
                                                                        </>
                                                                    )}


                                                                </td>
                                                                {/* <td className={member.status === 'PENDING' ? 'text-danger' : ''}>
                                                                {member.status === 'PENDING' ? timers[member.id] || "00:00:00" : ""}
                                                            </td> */}
                                                                <td className="text-center">
                                                                    {hasAnyPermission(["event_members.edit"]) && (
                                                                        <Link
                                                                            to={`/admin/event-members/edit/${member.id}`}
                                                                            className="btn btn-primary btn-sm me-2"
                                                                        >
                                                                            <i className="fa fa-pencil-alt"></i>
                                                                        </Link>
                                                                    )}
                                                                    {hasAnyPermission(["event_members.delete"]) &&
                                                                        member.status === 'PENDING' && (
                                                                            <button
                                                                                onClick={() => deleteMember(member.id)}
                                                                                className="btn btn-danger btn-sm"
                                                                            >
                                                                                <i className="fa fa-trash"></i>
                                                                            </button>
                                                                        )}
                                                                    {member.status === 'PAID' && (
                                                                        <>
                                                                            {/* <button
                                                                            onClick={() => regMember(member.id)}
                                                                            className="btn btn-warning btn-sm"
                                                                        >
                                                                            <i className="fa fa-check"></i>
                                                                        </button> */}
                                                                            <Link
                                                                                to={`/admin/event-members/rereg/${member.id}`}
                                                                                className="btn btn-warning btn-sm me-2"
                                                                            >
                                                                                <i className="fa fa-check"></i>
                                                                            </Link>
                                                                            {/* &nbsp; */}

                                                                            <button
                                                                                onClick={() => remainderPaids(member.id)}
                                                                                className="btn btn-info btn-sm"
                                                                            >
                                                                                <i className="fa fa-envelope"></i>
                                                                            </button>
                                                                        </>
                                                                    )}
                                                                </td>
                                                            </tr>
                                                        );

                                                    })
                                                ) : (
                                                    <tr>
                                                        <td colSpan={10}>
                                                            <div
                                                                className="alert alert-danger border-0 rounded shadow-sm w-100 text-center"
                                                                role="alert"
                                                            >
                                                                Data Belum Tersedia!.
                                                            </div>
                                                        </td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                    <Pagination
                                        currentPage={pagination.currentPage}
                                        perPage={pagination.perPage}
                                        total={pagination.total}
                                        onChange={(pageNumber) => fetchData(pageNumber, keywords)}
                                        position="end"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </LayoutAdmin>
    );
}
